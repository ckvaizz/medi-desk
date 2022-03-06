var express = require('express');

const { getShopkeepers } = require('../controllers/users');
var router = express.Router();
const { auth, isAdmin, checkValidator }=require('../middleware/auth');
const { statusValidator, idValidator } = require('../middleware/validator');

router.post('/get',auth,isAdmin,statusValidator,checkValidator,getShopkeepers)

router.post('delete',auth,isAdmin,idValidator,checkValidator,deleteUser)
module.exports = router;
