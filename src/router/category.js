const Router = require('koa-router')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const router = new Router()

router.get('/insterAllCategory', async (ctx, next) => {
  // 读取json文件,并保存到数据库
  fs.readFile(path.join(__dirname, './category.json'), 'utf8', (err, data) => {
    console.log(data)
  })

  ctx.body = '数据读取中...'
  await next()
})

router.post('/getCategory', async (ctx, next) => {
  // TODO
})

module.exports = router
