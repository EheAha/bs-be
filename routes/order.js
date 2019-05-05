var express = require('express');
var router = express.Router();
const orderController = require('../controllers/order')
// const userimgUploadMiddleWare = require('../middlewares/userimgUpload')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/save', orderController.save);
router.post('/listall', orderController.listall);



module.exports = router;
