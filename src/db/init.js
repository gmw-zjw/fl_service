const mongoose = require('mongoose')
const url = 'mongodb://localhost:27017/fl_service'
const glob = require('glob')
const { resolve } = require('path')

exports.initSchema = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}

exports.connect = () => {
  mongoose.connect(url)
  let maxConnection = 0

  return new Promise((resolve, reject) => {
    mongoose.connection.on('disconnected', () => {
      console.log('数据库连接成功')
      if (maxConnection <= 3) {
        maxConnection++
        mongoose.connect(url)
      } else {
        reject()
        throw new Error('数据库连接失败,请检查数据库是否正常开启')
      }
    })

    mongoose.connection.on('error', () => {
      console.log('数据库连接失败')
      if (maxConnection <= 3) {
        maxConnection++
        mongoose.connect(url)
      } else {
        reject()
        throw new Error('数据库连接失败,请检查数据是否正常打开')
      }
    })

    mongoose.connection.once('open', () => {
      console.log('数据库打开成功')
      resolve()
    })
  })
}
