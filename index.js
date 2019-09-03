
require('dotenv').config();

var express=require('express');
var app=express();
var port=5000;
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Cart=require('./public/productFnc/cart');
var csrf = require('csurf');
app.use(bodyParser.json()) // for parsing application/json

app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRETE));
var csrfProtection = csrf({ cookie: true });
app.use(express.static('public'));


var userRoute=require('./routes/user.routes');
var authRoute=require('./routes/login.routes');
var productRoute=require('./routes/product.routes');
var cartRoute=require('./routes/cart.routes');
var transferRoute=require('./routes/transfer.routes');
var authRequiredMiddleware=require('./middleware/auth.middileware');
var sessionMidleware=require('./middleware/session.middileware');


app.use(sessionMidleware.setSessionId);

var db=require('./db.js');
/**set the view engine and the views folder**/
app.set('views', './views');    
app.set('view engine', 'pug');
/*****************************/

app.get('/',function(request,respone){
    var cart=new Cart(request.signedCookies.sessionId);
    var currentItemsInCart=cart.countItem();
        respone.render('index',{
            name: 'Phong',
            itemInCart:currentItemsInCart
        });
});

app.use('/user',authRequiredMiddleware.requiredAuth,userRoute);
app.use('/auth',authRoute);
app.use('/product',productRoute);
app.use('/cart',cartRoute);
app.use('/transfer',authRequiredMiddleware.requiredAuth,csrfProtection,transferRoute);
app.listen(port,function(){
    console.log('Server listening on port '+ port);
});
