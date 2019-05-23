const mongoose = require('mongoose')
const Schema = mongoose.Schema

let hotSchema = new Schema({
  name: String,
  image: String,
  mallPrice: Number,
  goodsId: String,
  price: Number
})

mongoose.model('Hots', hotSchema)