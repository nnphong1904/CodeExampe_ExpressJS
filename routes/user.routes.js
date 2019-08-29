var express=require('express');
var multer  = require('multer')
var router=express.Router();
var controllers=require('../controllers/user.controllers');
var upload = multer({ dest: './public/uploads/' })
router.get('/search',controllers.search);


router.get('/',controllers.index);

router.get('/create',controllers.create);


router.get('/:id',controllers.view); 


router.post('/create',upload.single('avatar'),controllers.postCreate);



module.exports = router;