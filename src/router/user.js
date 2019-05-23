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

// 登录
router.post('/login', async (ctx, next) => {
  let loginUser = ctx.request.body
  let username = loginUser.username
  let password = loginUser.password
  const User = mongoose.model('User')

  await User.findOne({username: username}).exec().then(async (result) => {
    if (result) {
      let newUser = new User()
      await newUser.comparePassword(password, result.password)
        .then((isMatch) => {
          ctx.body = {
            code: 0,
            message: isMatch
          }
        })
        .catch(err => {
          ctx.body = {
            code:1,
            message: err
          }
        })
    } else {
      ctx.body = {
        code: 0,
        message: '用户名不存在'
      }
    }
  }).catch(err => {
    console.log(error)
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

module.exports = router