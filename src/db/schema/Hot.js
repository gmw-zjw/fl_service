const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hotSchema = new Schema({
  name: String,
  image: String,
  mallPrice: Number,
  goodsId: {required: true, type: String},
  price: Number
}, {
  collection: 'Hots'
})

mongoose.model('Hots', hotSchema)
