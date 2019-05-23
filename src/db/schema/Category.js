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
  ],
  comments: Schema.Types.Mixed,
  image: String
})

mongoose.model('Categorys', categorySchema)