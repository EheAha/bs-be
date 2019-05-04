const multer = require('multer')
const path = require('path')

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

const fileupload = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            res.render('position', {
                ret: false,
                data: JSON.stringify({
                    msg: err.message
                })
            })
        } else {
            next()
        }
    })
}

module.exports = {
    fileupload
}