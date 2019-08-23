var express=require('express');
var router=express.Router();
var controllers=require('../controllers/user.controllers');




router.get('/',controllers.index);

router.get('/search',controllers.search);

router.get('/create',controllers.create);

router.get('/:id',controllers.view); 

router.post('/create',controllers.postCreate);

module.exports = router;