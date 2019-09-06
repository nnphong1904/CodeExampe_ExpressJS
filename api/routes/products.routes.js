var express=require('express');
var router=express.Router();
var controllers=require('../controllers/product.controllers');
router.get('/',controllers.index);
module.exports=router;