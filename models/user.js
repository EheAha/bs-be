const mongoose = require('../utils/database')

// 创建Schema，创建集合
const userSchema = new mongoose.Schema({
    phone: String,
    username: String,
    password: String,
    userLogo: String,
    userStyle: String,
    userStylename: String
})
const UserModel = mongoose.model('users', userSchema)

const register = (data) => {
    console.log(data)
    let userModel = new UserModel(data)
    return userModel
        .save()
        .then((result) => {
            console.log(result)
            return result
        })
}

const findone = (username) => {
    return UserModel.findOne({ username })
        .then((result) => {
            return result
        })
}

const userupdate = ({
    id,
    data
}) => {
    return UserModel
        .findByIdAndUpdate(id, data)
        .then((result)=>{
            return result
        })
}

const findid = (id) => {
    return UserModel.findById(id)
        .then((result) => {
            return result
        })
}

module.exports = {
    register,
    findone,
    userupdate,
    findid
}