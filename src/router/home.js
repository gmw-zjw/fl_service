const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const router = new Router()

// 保存商城首页数据带数据库
router.get('/insertAllHomeInfo', async (ctx, next) => {
  //读取文件， 并把读取到的数据方法数据库
  fs.readFile(path.join(__dirname, 'data', './HomeData.json'), 'utf8', (err, data) => {
    if (err) throw err
    // 当我们读取多重嵌套的json数据时，会出现读取不到, 这里要转换下
    newData = JSON.parse(data)
    const Homes = mongoose.model('Homes')

    // dataMap
    let newCategory = []
    let newRecommend = []
    let newFloor1 = []
    let newFloor2 = []
    let newFloor3 = []
    let slides = newData.data.slides
    let shopInfo = newData.data.shopInfo
    let integralMallPic = newData.data.integralMallPic
    let toShareCode = newData.data.toShareCode
    newData.data.recommend.map((value, index) => {
      return newRecommend.push(value)
    })
    let advertesPicture = newData.data.advertesPicture
    newData.data.floor1.map((value, index) => {
      return newFloor1.push(value)
    })
    newData.data.floor1.map((value, index) => {
      return newFloor2.push(value)
    })
    newData.data.floor1.map((value, index) => {
      return newFloor3.push(value)
    })
    let saoma = newData.data.saoma
    let newUser = newData.data.newUser
    let floor1Pic = newData.data.floor1Pic
    let floor2Pic = newData.data.floor2Pic
    let floorName = newData.data.floorName
    newData.data.category.map((value, index) => {
      return newCategory.push(value)
    })
    let reservationGoods = newData.data.reservationGoods
    let obj = {slides, shopInfo, integralMallPic, toShareCode, recommend: newRecommend, advertesPicture, floor1: newFloor1, floor2: newFloor2, floor3: newFloor3,saoma,newUser, floor1Pic, floor2Pic,floorName, category: newCategory,reservationGoods}
    console.log(obj)
    //保存到数据库
    let newHome = new Homes(obj)
    newHome.save().then(() => {
      ctx.body = '数据保存成功...'
    })
    .catch(error => {
      ctx.body = `数据保存失败${error}`
    })
    
  })

  ctx.body = '数据保存中...'

  await next()
})

// 商城首页数据查询
router.post('/getHomePages', async (ctx, next) => {
  let Homes = mongoose.model('Homes')
  let result = await Homes.find({}).exec()
  ctx.body = {
    code: 0,
    message: 'success',
    data: result
  }
  await next()
})

module.exports = router
