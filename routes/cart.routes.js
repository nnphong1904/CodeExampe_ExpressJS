var express=require('express');
var router=express.Router();
var controllers=require('../controllers/cart.controller');

router.get('/',controllers.index);
router.get('/add/:productId',controllers.addToCart);

module.exports=router;