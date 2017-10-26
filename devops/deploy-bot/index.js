const Koa = require('koa')
const cors = require('koa-cors')
const router = require('koa-router')()
const child_process = require('child_process');

const app = new Koa()

const DEFAULT_PORT = 8089
const PORT = process.env.PORT || DEFAULT_PORT

const SCRIPT_PATH = process.env.SCRIPT_PATH || './deploy.sh'

app.use(cors())

router.get('/update', (ctx) => {
    child_process.execFile(SCRIPT_PATH, function(error, stdout, stderr){
        if(error) console.log(error);
    	console.log(stdout);
    })
    ctx.type = 'json'
    ctx.body = {"ok": true}
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(PORT, () => {
  console.log('server started on port:' + PORT)
})
