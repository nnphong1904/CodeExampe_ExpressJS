var express=require('express');
var multer  = require('multer')
var router=express.Router();
var controllers=require('../controllers/transfer.controllers');

router.get('/',controllers.index);
router.post('/',controllers.postTransfer);
module.exports=router;