const multer = require('multer')
const path = require('path')
const positionModel = require('../models/position')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../public/uploads/'))
    },
    filename: function (req, file, cb) {
        let originalName = file.originalname
        let ext = originalName.substr(originalName.lastIndexOf('.'))
        let filename = file.fieldname + '-' + Date.now() + ext
        req.body.movieLogo = filename
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
}).single('movieLogo')


const imgupload = (req, res, next) => {
    upload(req, res, async (err) => {
        let { movieLogo, id } = req.body
        let result = await positionModel.listone(id)
        if (err) {
            res.render('position', {
                ret: false,
                data: JSON.stringify({
                    msg: err.message
                })
            })
        }
        if (movieLogo == '') {
            req.body.movieLogo = result.movieLogo
            next()
        } else {
            next()
        }
    })
}

module.exports = {
    imgupload
}