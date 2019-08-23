var express=require('express');
var router=express.Router();
var controllers=require('../controllers/user.controllers');




router.get('/',controllers.index);

router.get('/cookie',function(req,res){
    res.cookie('user-id',123456);
    res.send('Hello');
});

router.get('/search',controllers.search);

router.get('/create',controllers.create);

router.get('/:id',controllers.view); 

router.post('/create',controllers.postCreate);

module.exports = router;