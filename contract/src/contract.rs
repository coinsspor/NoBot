use linera_sdk::{
    base::WithContractAbi,
    views::{RootView, View, ViewStorageContext},
    Contract, ContractRuntime,
};

use crate::{
    state::{LaunchState, EligibilityCheck, ClaimRecord},
    Message, Operation, AppResponse,
};

pub struct NobotContract {
    state: LaunchState,
    runtime: ContractRuntime<Self>,
}

linera_sdk::contract!(NobotContract);

impl WithContractAbi for NobotContract {
    type Abi = crate::NobotAbi;
}

impl Contract for NobotContract {
    type Message = Message;
    type Parameters = ();
    type InstantiationArgument = ();

    async fn load(runtime: ContractRuntime<Self>) -> Self {
        let state = LaunchState::load(ViewStorageContext::from(runtime.key_value_store()))
            .await
            .expect("Failed to load state");
        NobotContract { state, runtime }
    }

    async fn instantiate(&mut self, _argument: ()) {
        self.state.is_active.set(false);
    }

    async fn execute_operation(&mut self, operation: Operation) -> AppResponse {
        match operation {
            Operation::CreateLaunch {
                collection_name,
                total_supply,
                window_duration,
                min_wallet_age_days,
                min_tx_count,
                min_total_volume,
            } => {
                self.handle_create_launch(
                    collection_name,
                    total_supply,
                    window_duration,
                    min_wallet_age_days,
                    min_tx_count,
                    min_total_volume,
                )
                .await
            }
            Operation::CheckEligibility { wallet_address } => {
                self.handle_check_eligibility(wallet_address).await
            }
            Operation::Claim { wallet_address } => {
                self.handle_claim(wallet_address).await
            }
            Operation::StartLaunch => self.handle_start_launch().await,
        }
    }

    async fn execute_message(&mut self, message: Message) {
        match message {
            Message::EligibilityResult { wallet_address, eligible, metadata } => {
                self.handle_eligibility_result(wallet_address, eligible, metadata).await;
            }
            Message::ClaimNotification { wallet_address, token_id, timestamp } => {
                self.handle_claim_notification(wallet_address, token_id, timestamp).await;
            }
        }
    }

    async fn store(mut self) {
        self.state.save().await.expect("Failed to save state");
    }
}

impl NobotContract {
    async fn handle_create_launch(
        &mut self,
        collection_name: String,
        total_supply: u64,
        window_duration: u64,
        min_wallet_age_days: u64,
        min_tx_count: u64,
        min_total_volume: String,
    ) -> AppResponse {
        self.state.collection_name.set(collection_name.clone());
        self.state.total_supply.set(total_supply);
        self.state.window_duration.set(window_duration);
        self.state.min_wallet_age_days.set(min_wallet_age_days);
        self.state.min_tx_count.set(min_tx_count);
        self.state.min_total_volume.set(min_total_volume.clone());
        self.state.is_active.set(false);

        AppResponse::LaunchCreated {
            collection_name,
            total_supply,
        }
    }

    async fn handle_check_eligibility(&mut self, wallet_address: String) -> AppResponse {
        let wallet_age_days = self.mock_get_wallet_age(&wallet_address).await;
        let tx_count = self.mock_get_tx_count(&wallet_address).await;
        let total_volume = self.mock_get_total_volume(&wallet_address).await;
        let ai_score = self.mock_get_ai_score(&wallet_address).await;

        let min_wallet_age = *self.state.min_wallet_age_days.get();
        let min_tx = *self.state.min_tx_count.get();
        
        let eligible = wallet_age_days >= min_wallet_age 
            && tx_count >= min_tx
            && ai_score >= 0.7;

        let timestamp = self.runtime.system_time().micros();
        
        let check = EligibilityCheck {
            wallet_address: wallet_address.clone(),
            timestamp,
            eligible,
            wallet_age_days,
            tx_count,
            total_volume: total_volume.clone(),
            ai_score,
        };

        self.state
            .eligibility_checks
            .insert(&wallet_address, check)
            .expect("Failed to store eligibility");

        AppResponse::EligibilityChecked {
            wallet_address,
            eligible,
            wallet_age_days,
            tx_count,
            total_volume,
            ai_score,
        }
    }

    async fn handle_claim(&mut self, wallet_address: String) -> AppResponse {
        if !*self.state.is_active.get() {
            return AppResponse::Error {
                message: "Launch not active".to_string(),
            };
        }

        let eligible_check = self
            .state
            .eligibility_checks
            .get(&wallet_address)
            .await
            .expect("Failed to get eligibility");

        if eligible_check.is_none() || !eligible_check.unwrap().eligible {
            return AppResponse::Error {
                message: "Not eligible".to_string(),
            };
        }

        let already_claimed = self
            .state
            .claims
            .get(&wallet_address)
            .await
            .expect("Failed to check claim")
            .is_some();

        if already_claimed {
            return AppResponse::Error {
                message: "Already claimed".to_string(),
            };
        }

        let minted = *self.state.minted_count.get();
        let total = *self.state.total_supply.get();

        if minted >= total {
            return AppResponse::Error {
                message: "Sold out".to_string(),
            };
        }

        let token_id = minted + 1;
        let timestamp = self.runtime.system_time().micros();
        let nonce = format!("{:016x}", timestamp);
        
        let claim = ClaimRecord {
            wallet_address: wallet_address.clone(),
            token_id,
            timestamp,
            nonce,
        };

        self.state
            .claims
            .insert(&wallet_address, claim)
            .expect("Failed to store claim");

        self.state.minted_count.set(minted + 1);

        let queue = *self.state.queue_length.get();
        self.state.queue_length.set(queue + 1);

        AppResponse::ClaimSuccess {
            wallet_address,
            token_id,
            tx_hash: format!("0x{:064x}", token_id),
        }
    }

    async fn handle_start_launch(&mut self) -> AppResponse {
        self.state.is_active.set(true);
        let start_time = self.runtime.system_time().micros();
        self.state.launch_start_time.set(Some(start_time));

        AppResponse::LaunchStarted {
            start_time,
        }
    }

    async fn handle_eligibility_result(
        &mut self,
        wallet_address: String,
        eligible: bool,
        metadata: String,
    ) {
        log::info!(
            "Eligibility result for {}: {} (metadata: {})",
            wallet_address,
            eligible,
            metadata
        );
    }

    async fn handle_claim_notification(
        &mut self,
        wallet_address: String,
        token_id: u64,
        timestamp: u64,
    ) {
        log::info!(
            "Claim notification: {} claimed token {} at {}",
            wallet_address,
            token_id,
            timestamp
        );
    }

    async fn mock_get_wallet_age(&self, _wallet: &str) -> u64 {
        60
    }

    async fn mock_get_tx_count(&self, _wallet: &str) -> u64 {
        150
    }

    async fn mock_get_total_volume(&self, _wallet: &str) -> String {
        "5.5".to_string()
    }

    async fn mock_get_ai_score(&self, _wallet: &str) -> f64 {
        0.92
    }
}
