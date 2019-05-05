const bcrypt = require('bcrypt')
const userModel = require('../models/user')

const register = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    let { phone, username, password } = req.body
    let isSigned = !!(await userModel.findone(username))
    if (isSigned) {
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                msg: '该用户已经存在！'
            })
        })
    } else {
        let result = await userModel.register({
            phone,
            username,
            password: await _doCrypto(password),
            userLogo: '',
            userStyle: '',
            userStylename: ''
        })
        if (!!result) {
            res.render('user', {
                ret: true,
                data: JSON.stringify({
                    msg: '注册成功~'
                })
            })
        }
    }
}

const signin = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    let { username, password } = req.body
    let result = await userModel.findone(username)
    if (!!result) {
        let isCorrect = await _comparePwd(password, result.password)
        if (isCorrect) {
            req.session.username = username
            res.render('user', {
                ret: true,
                data: JSON.stringify({
                    username
                })
            })
        } else {
            res.render('user', {
                ret: false,
                data: JSON.stringify({
                    msg: '密码错误！'
                })
            })
        }
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '该用户不存在！'
            })
        })
    }
}

const _doCrypto = (password) => {
    return new Promise((resolve) => {
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, function (err, hash) {
                resolve(hash)
            });
        });
    })
}

const _comparePwd = (fromUser, fromDatabase) => {
    return new Promise((resolve) => {
        bcrypt.compare(fromUser, fromDatabase, (err, res) => {
            resolve(res)
        })
    })
}

const isSignin = async (req, res, next) => {
    res.header('Content-Type', 'application/json')
    let username = req.session.username
    if (!!username) {
        let result = await userModel.findone(username)
        res.render('user', {
            ret: true,
            data: JSON.stringify({
                username,
                result
            })
        })
    } else {
        res.render('user', {
            ret: false,
            data: JSON.stringify({
                msg: '没有权限!'
            })
        })
    }
}

const signout = (req, res, next) => {
    res.header('Content-Type', 'application/json')
    req.session.username = null
    res.render('user', {
        ret: true,
        data: JSON.stringify({
            msg: '退出成功~'
        })
    })
}

const findone = async (req, res, next) => {
    let { username } = req.body
    res.header('Content-Type', 'application/json')
    let data = JSON.stringify(await userModel.findone(username))
    if (!!data) {
        res.render('user', {
            ret: true,
            data
        })
    }
}

const userupdate = async (res, req, next) => {
    res.header('Content-Type', 'application/json')
    //为啥reqres会包一层
    let result = await userModel.userupdate({
        id: req.req.body.id,
        data: {
            ...req.req.body
        }
    })
    if (!!result) {
        res.res.render('user', {
            ret: true,
            data: JSON.stringify({
                msg: '修改成功~'
            })
        })
    }
}

const save = async (req, res, next) => {
    res.header('Content-Type', 'application/json; charset=utf-8')
    let result = await userModel.save({
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


module.exports = {
    register,
    signin,
    isSignin,
    signout,
    findone,
    userupdate,
    save
}