const momgoose = require('mongoose')
const Schema = momgoose.Schema

const homeSchema = new Schema({
  slides: [
    {
      image: String,
      goodsId: String 
    }
  ],
  shopInfo: {
    leaderImage: String,
    leaderPhone: String
  },
  integralMallPic: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  toShareCode: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  recommend: [{
    image: String,
    mallPrice: Number,
    goodsName: String,
    goodsId: String,
    price: Number
  }],
  advertesPicture: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  floor1: [
    {
      image: String,
      goodsId: String
    }
  ],
  floor2: [
    {
      image: String,
      goodsId: String
    }
  ],
  floor3: [
    {
      image: String,
      goodsId: String
    }
  ],
  saoma: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  newUser: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  floor1Pic: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  floor2Pic: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  floorName: {
    floor1: String,
    floor2: String,
    floor3: String
  },
  category: [
    {
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
    }
  ],
  floor3Pic: {
    PICTURE_ADDRESS: String,
    TO_PLACE: String
  },
  reservationGoods: Array
})

momgoose.model('Homes', homeSchema)