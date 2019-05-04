const express = require('express')
const positionController = require('../controllers/position')

const fileUploadMiddleWare = require('../middlewares/fileupload')
const imgUploadMiddleWare = require('../middlewares/imgUpload')
const userAuthMiddleware = require('../middlewares/userauth')

const router = express.Router()

// 注意，listall不要调用
router.get('/listall', positionController.listall)
router.get('/list', userAuthMiddleware.auth, positionController.list)
router.post('/listone', positionController.listone)
router.get('/somelist', positionController.somelist)
router.post('/save', fileUploadMiddleWare.fileupload, positionController.save)
router.post('/update', imgUploadMiddleWare.imgupload, positionController.update)
router.get('/remove', positionController.remove)

router.get('/fe/list', positionController.list)

module.exports = router