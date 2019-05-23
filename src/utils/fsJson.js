const fs = require('fs')
const mongoose = require('mongoose')

// 读取热榜商品数据
fs.readFile('../data/hot.json', 'utf8', function(err, data) {
  let newData = JSON.parse(data)
  let i=0
  let Hots = mongoose.model('Hots')

  newData.data.map(function(val, index) {
    if (val!=null) {
      console.log(val)
      let newGoods = new Hots(val)
      newGoods.save().then(() => {
        i++
        console.log('数据保存成功')
      })
      .catch(err => {
        console.log('数据保存失败'+err)
      })
    }
  })
})

