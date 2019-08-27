
require('dotenv').config();

var express=require('express');
var app=express();
var port=9000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRETE));

app.use(express.static('public'));

var userRoute=require('./routes/user.routes');
var authRoute=require('./routes/login.routes');
var productRoute=require('./routes/product.routes');
var authRequiredMiddleware=require('./middleware/auth.middileware');

var db=require('./db.js');
/**set the view engine and the views folder**/
app.set('views', './views');    
app.set('view engine', 'pug');
/*****************************/

app.get('/',function(request,respone){
        respone.render('index',{
            name: 'Phong'
        });
});

app.use('/user',authRequiredMiddleware.requiredAuth,userRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.listen(port,function(){
    console.log('Server listening on port '+ port);
});
