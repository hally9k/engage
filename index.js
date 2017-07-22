const Koa = require('koa')
const mount = require('koa-mount')
const graphqlHTTP = require('koa-graphql')
const rootSchema = require('./server/schema')

const PORT = 8001

const app = new Koa()

app.use(mount('/graphql', graphqlHTTP({
    schema: rootSchema,
    graphiql: true
})))

app.listen(PORT)
