const Koa = require('koa')
const mongoose = require('mongoose')
const app = new Koa()
const { connect, initSchema } = require('./db/init')

// 链接数据库
;(async () => {
  await connect()
  initSchema()
  const user = mongoose.model('User')
  let onceUser = new user({username: '执念1212', password: '123'})

  onceUser.save().then(() => {
    console.log('注册成功')
  })

})()

app.use(async ctx => {
  ctx.body = 'hello'
})

app.listen(3001, () => {
  console.log('prot service started 3001')
})
