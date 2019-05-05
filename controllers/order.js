const orderModel = require('../models/order')

const save = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    // console.log(req.body,"b")
    let result = await orderModel.saveInfo({
        ...req.body
    })
    if (!!result) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                msg: '数据保存成功 :)'
            })
        })
    } else {
        res.render('position', {
            ret: false,
            data: JSON.stringify({
                msg: '数据保存失败 :('
            })
        })
    }
}


const listall = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    let keywords = req.body.username
    console.log(req.body.username,"#")
    let data = await orderModel.listall(keywords)
    if (data) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                total: data
            })
        })
    }
}

module.exports = {
   save,
   listall
}