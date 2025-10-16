use async_graphql::{Request, EmptySubscription, Object, Schema};
use linera_sdk::base::{ContractAbi, ServiceAbi};
use serde::{Deserialize, Serialize};

pub mod contract;
pub mod service;
pub mod state;

pub use state::{LaunchState, EligibilityCheck, ClaimRecord, LaunchMetrics};

pub struct NobotAbi;

impl ContractAbi for NobotAbi {
    type Operation = Operation;
    type Response = AppResponse;
}

impl ServiceAbi for NobotAbi {
    type Query = Request;
    type QueryResponse = async_graphql::Response;
}

#[derive(Debug, Deserialize, Serialize)]
pub enum Operation {
    CreateLaunch {
        collection_name: String,
        total_supply: u64,
        window_duration: u64,
        min_wallet_age_days: u64,
        min_tx_count: u64,
        min_total_volume: String,
    },
    CheckEligibility {
        wallet_address: String,
    },
    Claim {
        wallet_address: String,
    },
    StartLaunch,
}

#[derive(Debug, Deserialize, Serialize)]
pub enum Message {
    EligibilityResult {
        wallet_address: String,
        eligible: bool,
        metadata: String,
    },
    ClaimNotification {
        wallet_address: String,
        token_id: u64,
        timestamp: u64,
    },
}

#[derive(Debug, Deserialize, Serialize)]
pub enum AppResponse {
    LaunchCreated {
        collection_name: String,
        total_supply: u64,
    },
    EligibilityChecked {
        wallet_address: String,
        eligible: bool,
        wallet_age_days: u64,
        tx_count: u64,
        total_volume: String,
        ai_score: f64,
    },
    ClaimSuccess {
        wallet_address: String,
        token_id: u64,
        tx_hash: String,
    },
    LaunchStarted {
        start_time: u64,
    },
    Error {
        message: String,
    },
}

pub type NobotSchema = Schema<QueryRoot, MutationRoot, EmptySubscription>;

pub struct QueryRoot;

#[Object]
impl QueryRoot {
    async fn launch_metrics(&self) -> LaunchMetrics {
        LaunchMetrics {
            total_supply: 10000,
            minted_count: 0,
            queue_length: 0,
            success_rate: 94,
            is_active: false,
        }
    }
}

pub struct MutationRoot;

#[Object]
impl MutationRoot {
    async fn create_launch(&self, collection_name: String, _total_supply: i32) -> Result<String, String> {
        Ok(format!("Launch {} created", collection_name))
    }
}
