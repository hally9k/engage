import cors from 'koa-cors'
import graphqlHTTP from 'koa-graphql'
import Koa from 'koa'
import mount from 'koa-mount'
import { createServer } from 'http'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

import schema from './server/schema'
import sql from './server/connector/sql'
import {
    Activity,
    Child,
    Comment,
    Session,
    Subject,
    User
} from './server/model'

const user = new User(sql)
const child = new Child(sql)
const comment = new Comment(sql)
const subject = new Subject(sql)
const activity = new Activity(sql)
const session = new Session(sql)

const PORT = 8001

const server = new Koa()

server.use(cors())

server.use(
    mount(
        '/graphql',
        graphqlHTTP({
            schema,
            graphiql: true,
            context: {
                user,
                child,
                comment,
                subject,
                activity,
                session
            },
            subscriptionsEndpoint: 'ws://localhost:8001/subscriptions'
        })
    )
)

// server.listen(PORT)

const ws = createServer(server.callback())

ws.listen(PORT, () => {
    console.log(`Apollo Server is now running on http://localhost:${PORT}`)
    // eslint-disable-next-line no-new
    new SubscriptionServer(
        {
            execute,
            subscribe,
            schema
        },
        {
            server: ws,
            path: '/subscriptions'
        }
    )
})
