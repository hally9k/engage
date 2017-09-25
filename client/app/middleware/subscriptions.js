import createGraphQLSubscriptionsMiddleware from 'redux-graphql-subscriptions'
import { port } from '../../config'

const url = `ws://${location.hostname}:${port}/subscriptions`
const options = {
    reconnect: true,
    reconnectionAttempts: 20,
}
const graphQLSubscriptionsMiddleware = createGraphQLSubscriptionsMiddleware(
    url,
    options,
)

export default graphQLSubscriptionsMiddleware
