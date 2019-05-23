const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()


router.get('/', async ctx => {
  ctx.body = {
    code: 0,
    message: '用户页面'
  }
})

// 用户注册
router.post('/register', async (ctx, next) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  await newUser.save().then(() => {
    ctx.body = {
      code: 0,
      message: '注册成功!'
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: `注册失败${err}`
    }
  })

  await next()
})

module.exports = router