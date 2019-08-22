var express=require('express');
var app=express();
var port=3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'));

var userRoute=require('./routes/user.routes');

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

app.use('/user',userRoute);

app.listen(port,function(){
    console.log('Server listening on port '+ port);
})