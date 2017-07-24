const Koa = require('koa')
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')

const schema = require('./server/schema')
const sql = require('./server/schema/connector/sql')
const {
    User,
    Child,
    Subject,
    Activity,
    Session
} = require('./server/schema/model')

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
