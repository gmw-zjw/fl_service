const Koa = require('koa')
const Router = require('koa-router')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser')
const { connect, initSchema} = require('./db/init')
const app = new Koa()
let router = new Router()

let user = require('./router/user')
let home = require('./router/home')

router.use('/user', user.routes())
router.use('/home', home.routes())

// 链接数据库
;(async () => {
  await connect(),
  initSchema()
})()

app.use(cors())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3001, () => {
  console.log('prot service started 3001')
})
