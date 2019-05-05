const mongoose = require('../utils/database')

// 创建Schema，创建集合
const orderSchema = new mongoose.Schema({
        username: String,
        data:{}
})
const OrderModel = mongoose.model('orders', orderSchema);

//前端保存电影票数据时，会携带用户名信息，可使用用户名作为关联用户的唯一标识。"username":[]
const saveInfo = (data) => {
    // console.log(data,"*")
    let orderModel = new OrderModel(data)
    return orderModel
        .save()
        .then((result) => {
            // console.log(result,"#")
            return result
        })
}

const listall = (keywords) => {
    let reg = new RegExp(keywords, 'gi')
    console.log(keywords,reg,"*")
    return OrderModel
        .find({'username': reg})
        .sort({
            _id: -1
        })
        .then((result) => {
            console.log(result)
            return result
        })
        .catch((err) => {
            return false
        })
}

module.exports={
    saveInfo,
    listall
}





