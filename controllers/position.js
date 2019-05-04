const positionModel = require('../models/position')
const moment = require('moment')


const listall = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    let { keywords } = req.query
    let data = await positionModel.listall({
        keywords
    })
    if (data) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                total: data.length
            })
        })
    }
}

const list = async (req, res, next) => {
    res.header('Content-Type', 'application/json')

    let {
        pageNo = 1,
        pageSize = 5,
        keywords = ''
    } = req.query

    let list = await positionModel.list({
        start: (~~pageNo - 1) * ~~pageSize,
        count: ~~pageSize,
        keywords
    })

    if (list) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                list,
                total: (await positionModel.listall({
                    keywords
                })).length
            })
        })
    } else {
        res.render('position', {
            ret: false,
            data: JSON.stringify({
                msg: '获取数据失败，请和管理员联系~'
            })
        })
    }
}

const somelist = async (req, res, next) => {

    res.header('Content-Type', 'application/json')
    let {
        pageNo = 1,
        pageSize = 5
    } = req.query
    let list = await positionModel.somelist({
        start: (~~pageNo - 1) * ~~pageSize,
        count: ~~pageSize
    })
    if (!!list) {
        res.render('position', {
            ret: true,
            data: JSON.stringify(list)
        })
    }
}

const listone = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    let id = req.body.id
    let data = JSON.stringify(await positionModel.listone(id))
    if (data) {
        res.render('position', {
            ret: true,
            data
        })
    }
}

const save = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let result = await positionModel.save({
        ...req.body,
        createDate: moment().format('YYYY-MM-DD HH:mm')
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

const remove = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    const { query } = req
    let result = await positionModel.remove(query._id)
    if (result.ok == 1) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                msg: '数据删除成功 :)'
            })
        })
    } else {
        res.render('position', {
            ret: false,
            data: JSON.stringify({
                msg: '数据删除失败 :('
            })
        })
    }
}

const update = async (req, res, next) => {
    res.header('Content-Type', 'application/json')

    let result = await positionModel.update({
        id: req.body.id,
        data: {
            ...req.body
        }
    })

    if (!!result) {
        res.render('position', {
            ret: true,
            data: JSON.stringify({
                msg: '修改成功~'
            })
        })
    }
}

module.exports = {
    listall,
    list,
    save,
    remove,
    listone,
    update,
    somelist
}