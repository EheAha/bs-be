var express = require('express');
var router = express.Router();
const userController = require('../controllers/user')
const userimgUploadMiddleWare = require('../middlewares/userimgUpload')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', userController.register)
router.post('/signin', userController.signin)
router.get('/isSignin', userController.isSignin)
router.get('/signout', userController.signout)
router.post('/findone', userController.findone)
router.post('/userupdate', userimgUploadMiddleWare.imgupload, userController.userupdate)

module.exports = router;
