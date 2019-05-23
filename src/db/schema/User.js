const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
const bcrypt = require('bcrypt')
let ObjectId = Schema.Types.ObjectId    //声明Object类型
const SALT_WORK_FACTOR = 10

//创建我们的用户Schema
const userSchema = new Schema({
    UserId:ObjectId,
    username:{required:true,type:String},
    password:String,
    createAt:{type:Date,default:Date.now()},
    lastLoginAt:{type:Date,default:Date.now()}
},{
    collection: 'user'
})

// 用户密码加盐加密
userSchema.pre('save', function(next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) throw next(err)
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

//发布模型
mongoose.model('User',userSchema)