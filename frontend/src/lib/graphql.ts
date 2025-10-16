import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

const CONTRACT_ID = import.meta.env.VITE_CONTRACT_ID
const NODE_URL = import.meta.env.VITE_NODE_URL

const httpLink = createHttpLink({
  uri: `${NODE_URL}/${CONTRACT_ID}`,
})

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

export const STATS_QUERY = `
  query GetStats {
    stats {
      totalUsers
      totalLaunches
      totalClaims
      suspiciousAttempts
    }
    activeLaunchId
    queuePosition
  }
`
