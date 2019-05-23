const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
  mallCategoryId: String,
  mallCategoryName: String,
  bxMallSubDto: [
    {
      mallSubId: String,
      mallCategoryId: String,
      mallSubName: String,
      comments: Schema.Types.Mixed
    }
  ]
})

mongoose.model('Categorys', categorySchema)