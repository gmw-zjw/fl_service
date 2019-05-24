const Router = require('koa-router')
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const router = new Router()

/**
 * 读取本地json并保存到数据库
 */
router.get('/insterAllCategory', async (ctx, next) => {
  // 读取json文件,并保存到数据库
  fs.readFile(path.join(__dirname, './category.json'), 'utf8', (err, data) => {
    newData = JSON.parse(data)
    newData.data.map((val, index) => {
      // 保存数据到数据库
      const categorys = mongoose.model('Categorys')
      let Categorys = new categorys(val)
      
      Categorys.save().then(() => {
        console.log('接口数据保存成功')
      })
      .catch(err => {
        console.log(`接口数据保存失败${err}`)
      })
    })
  })

  ctx.body = '数据读取中...'
  await next()
})

// 获取数据
router.post('/getCategory', async (ctx, next) => {
  const Categorys = mongoose.model('Categorys')

  let result = await Categorys.find({}).exec()

  ctx.body = {
    code: 0,
    message: 'success',
    data: result
  }

  await next()
})

// 根据大类id，页数，小类id获取数据
router.post('/getMallGoods', async (ctx, next) => {

  // 从请求体中拿到query，根据要求查询数据库，并返回接口数据

  let quertData = {
    page:ctx.query.page,
    mallCategoryId: ctx.query.mallCategoryId,
    mallSubId: ctx.query.mallSubId
  }

  //console.log(quertData)

  const Categorys = mongoose.model('Categorys')

  let result = await Categorys.find({quertData}).exec()
  
  if ( result !== null) {
    ctx.body = {
      code: 0,
      message: 'success',
      data: result
    }
  } else {
    ctx.body = {
      code: 1,
      message: 'error',
      data: '数据查询失败， 请检查传入的字段是否正确'
    }
  }

  await next()
})

module.exports = router
