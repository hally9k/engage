import createGraphQLSubscriptionsMiddleware from 'redux-graphql-subscriptions'
import { port } from 'config'

const url = `ws://localhost:${port}/subscriptions`
const options = {
    reconnect: true,
    reconnectionAttempts: 20,
}
const graphQLSubscriptionsMiddleware = createGraphQLSubscriptionsMiddleware(
    url,
    options,
)

export default graphQLSubscriptionsMiddleware
