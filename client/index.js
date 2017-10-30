import Koa from 'koa'
import staticFiles from 'koa-static'
import compress from 'koa-compress'
import historyApiFallback from 'koa-history-api-fallback'

const DEFAULT_PORT = 8080

const PORT = process.env.PORT || DEFAULT_PORT

const server = new Koa()

server.use(historyApiFallback())
server.use(staticFiles('public'))
server.use(
    compress({
        threshold: 2048
    })
)

server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Engage Frontend is now running on port ${PORT}...`)
})
