import Koa from 'koa'
import staticFiles from 'koa-static'

const DEFAULT_PORT = 8080

const PORT = process.env.PORT || DEFAULT_PORT

const server = new Koa()

server.use(staticFiles('public'))

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Engage Frontend is now running on http://localhost:${PORT}...`)
})
