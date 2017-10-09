import cors from 'koa-cors'
import graphqlHTTP from 'koa-graphql'
import Koa from 'koa'
import mount from 'koa-mount'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import schema from './schema'
import redis from './connector/redis'
import {
    activity,
    child,
    conversation,
    message,
    session,
    subject,
    user,
} from './model'

const context = {
    user,
    child,
    conversation,
    message,
    subject,
    activity,
    session,
    redis,
}

const DEFAULT_PORT = 8081

const PORT = process.env.PORT || DEFAULT_PORT

const server = new Koa()

server.use(cors())

server.use(
    mount(
        '/graphql',
        graphqlHTTP({
            schema,
            graphiql: true,
            context,
            subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`,
            formatError: error => ({
                message: error.message,
                status: error.status,
            }),
        }),
    ),
)

const ws = createServer(server.callback())

ws.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Engage Server is now running on http://localhost:${PORT}...`)
    // eslint-disable-next-line no-new
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema,
            onConnect: () => {
                return context
            },
        },
        {
            server: ws,
            path: '/subscriptions',
        },
    )
})
