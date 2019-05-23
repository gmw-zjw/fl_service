const fs = require('fs')

// 读取热榜商品数据
fs.readFile('../data/hot.json', 'utf8', function(err, data) {
  let newData = JSON.parse(data)
  let i=0
  let pushData = []
  newData.data.map(function(val, index) {
    if (val!=null) {
      i++
      console.log(val.name)
      pushData.push(val)
    }
  })
  console.log(i)
  console.log(pushData)
})

