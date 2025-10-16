use async_graphql::{EmptySubscription, Request, Response, Schema};
use linera_sdk::{
    base::WithServiceAbi,
    views::{View, ViewStorageContext},
    Service, ServiceRuntime,
};

use crate::{
    state::{LaunchState, LaunchMetrics},
    QueryRoot, MutationRoot,
};

pub struct NobotService {
    state: LaunchState,
}

linera_sdk::service!(NobotService);

impl WithServiceAbi for NobotService {
    type Abi = crate::NobotAbi;
}

impl Service for NobotService {
    type Parameters = ();

    async fn new(runtime: ServiceRuntime<Self>) -> Self {
        let state = LaunchState::load(ViewStorageContext::from(runtime.key_value_store()))
            .await
            .expect("Failed to load state");
        NobotService { state }
    }

    async fn handle_query(&self, request: Request) -> Response {
        let schema = Schema::build(
            QueryRoot,
            MutationRoot,
            EmptySubscription,
        )
        .finish();
        
        schema.execute(request).await
    }
}

impl NobotService {
    pub async fn get_launch_metrics(&self) -> LaunchMetrics {
        LaunchMetrics {
            total_supply: *self.state.total_supply.get(),
            minted_count: *self.state.minted_count.get(),
            queue_length: *self.state.queue_length.get(),
            success_rate: *self.state.success_rate.get(),
            is_active: *self.state.is_active.get(),
        }
    }
}
