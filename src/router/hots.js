// const Koa = require('koa')
// const app = new Koa()
const Router = require ('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')

// 将数据保存到数据库
router.get('/insertAllGoodsInfo',async(ctx, next)=>{
   // 这块有个坑， 注意读取文件路径不对
     fs.readFile(path.join(__dirname, 'data', './HomeHot.json'),'utf8',(err,data)=>{
       //console.log(data)
        newData = JSON.parse(data)
        let saveCount=0
        const Hots = mongoose.model('Hots')
        newData.data.map((value,index)=>{
            console.log(value)
            let newHots = new Hots(value)
            newHots.save().then(()=>{
                saveCount++
                console.log('成功'+saveCount)
            }).catch(error=>{
                 console.log('失败：'+error)
            })
        }) 
    })
    ctx.body="开始导入数据"

    await next()
})

// 查找所有hot数据
router.post('/getHotsAll', async (ctx, next) => {
  // 查找数据库，返回数据
  const Hots = mongoose.model('Hots')
  const result = await Hots.find({}).exec()
  console.log(result)
  ctx.body = {
    code: 0,
    message: 'success',
    data: result
  }
})

module.exports=router;