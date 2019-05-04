const mongoose = require('../utils/database')

// 创建Schema，创建集合
// const positionSchema = new mongoose.Schema({
//     companyLogo: String,
//     companyName: String,
//     positionName: String,
//     city: String,
//     salary: String,
//     createDate: String
// })
const positionSchema = new mongoose.Schema({
    movieLogo: String,
    movieName: String,
    movieScore: String,
    starring: String,
    releasedInfo: String
})
const PositionModel = mongoose.model('positions', positionSchema)

const listall = ({
    keywords
}) => {
    let reg = new RegExp(keywords, 'gi')
    return PositionModel
        .find({
            $or: [
                {
                    'movieName': reg
                },
                {
                    'starring': reg
                }
            ]
        })
        .sort({
            _id: -1
        })
        .then((result) => {
            return result
        })
        .catch((err) => {
            return false
        })
}

const somelist = ({
    start,
    count
}) => {
    return PositionModel
        .find()
        .sort({
            _id: -1
        })
        .skip(start)
        .limit(count)
        .then((result) => {
            return result
        })
}

const list = ({
    start,
    count,
    keywords
}) => {
    let reg = new RegExp(keywords, 'gi')
    return PositionModel
        .find({
            $or: [
                {
                    'movieName': reg
                },
                {
                    'starring': reg
                }
            ]
        })
        .sort({
            _id: -1
        })
        .skip(start)
        .limit(count)
        .then((result) => {
            console.log(result)
            return result
        })
}

const listone = (id) => {
    return PositionModel
        .findById(id)
        .then((result) => {
            return result
        })
}

const save = (data) => {
    return new PositionModel(data)
        .save()
        .then((result) => {
            console.log(result)
            return result
        })
}

const remove = (data) => {
    var wherestr = { '_id': data };
    return PositionModel
        .remove(wherestr, (err, res) => {
            if (err) {
                console.log("Error:" + err);
            }
            else {
                return res
            }
        })
}

const update = ({
    id,
    data
}) => {
    return PositionModel
        .findByIdAndUpdate(id, data)
        .then((result) => {
            return result
        })
}


module.exports = {
    list,
    listall,
    listone,
    save,
    remove,
    update,
    somelist
}