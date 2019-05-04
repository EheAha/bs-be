const multer = require('multer')
const path = require('path')
const userModel = require('../models/user')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/users/'))
    },
    filename: function (req, file, cb) {
        let originalName = file.originalname
        let ext = originalName.substr(originalName.lastIndexOf('.'))
        let filename = file.fieldname + '-' + Date.now() + ext
        req.body.userLogo = filename
        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    if (/^image/.test(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
        cb(new Error('文件类型必须是.jpg, .jpeg, .png, .gif'))
    }
}

const upload = multer({
    storage,
    fileFilter
}).single('userLogo')

const imgupload = (req, res, next) => {
    upload(req, res, async (err) => {

        let { userLogo, id } = req.body
        let result = await userModel.findid(id)
        if (err) {
            res.render('position', {
                ret: false,
                data: JSON.stringify({
                    msg: err.message
                })
            })
        }
        //console.log(req.body)
        if (userLogo == '') {
            req.body.userLogo = result.userLogo
            next()
        } else {
            next()
        }
    })
}

module.exports = {
    imgupload
}