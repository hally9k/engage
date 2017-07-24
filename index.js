import Koa from 'koa'
import mount from 'koa-mount'
import graphqlHTTP from 'koa-graphql'

import schema from './server/schema'
import sql from './server/connector/sql'
import { Activity, Child, Session, Subject, User } from './server/model'

const user = new User(sql)
const child = new Child(sql)
const subject = new Subject(sql)
const activity = new Activity(sql)
const session = new Session(sql)

const PORT = 8001

const app = new Koa()

app.use(
    mount(
        '/graphql',
        graphqlHTTP({
            schema,
            graphiql: true,
            context: {
                user,
                child,
                subject,
                activity,
                session
            }
        })
    )
)

app.listen(PORT)
