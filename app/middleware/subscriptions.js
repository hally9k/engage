import createGraphQLSubscriptionsMiddleware from 'redux-graphql-subscriptions'

const url = 'ws://localhost:8001/subscriptions'
const options = {
    reconnect: true,
    reconnectionAttempts: 20,
}
const graphQLSubscriptionsMiddleware = createGraphQLSubscriptionsMiddleware(
    url,
    options,
)

export default graphQLSubscriptionsMiddleware
