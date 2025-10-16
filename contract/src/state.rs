use async_graphql::SimpleObject;
use linera_sdk::views::{linera_views, MapView, RegisterView, RootView, ViewStorageContext};
use serde::{Deserialize, Serialize};

#[derive(RootView, async_graphql::SimpleObject)]
#[view(context = "ViewStorageContext")]
pub struct LaunchState {
    pub collection_name: RegisterView<String>,
    pub total_supply: RegisterView<u64>,
    pub minted_count: RegisterView<u64>,
    pub window_duration: RegisterView<u64>,
    pub is_active: RegisterView<bool>,
    pub launch_start_time: RegisterView<Option<u64>>,
    
    pub min_wallet_age_days: RegisterView<u64>,
    pub min_tx_count: RegisterView<u64>,
    pub min_total_volume: RegisterView<String>,
    
    pub eligibility_checks: MapView<String, EligibilityCheck>,
    pub claims: MapView<String, ClaimRecord>,
    
    pub queue_length: RegisterView<u64>,
    pub success_rate: RegisterView<u64>,
}

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject)]
pub struct EligibilityCheck {
    pub wallet_address: String,
    pub timestamp: u64,
    pub eligible: bool,
    pub wallet_age_days: u64,
    pub tx_count: u64,
    pub total_volume: String,
    pub ai_score: f64,
}

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject)]
pub struct ClaimRecord {
    pub wallet_address: String,
    pub token_id: u64,
    pub timestamp: u64,
    pub nonce: String,
}

#[derive(Clone, Debug, Deserialize, Serialize, SimpleObject)]
pub struct LaunchMetrics {
    pub total_supply: u64,
    pub minted_count: u64,
    pub queue_length: u64,
    pub success_rate: u64,
    pub is_active: bool,
}
