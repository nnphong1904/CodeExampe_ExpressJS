var db=require('../db');
var md5 = require('md5');
var cartControllers=require('./cart.controller');
module.exports.login=function(req,res){
    var obj=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    res.render('auth/login',{itemsInCart:sum});
}
module.exports.postLogin=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var hashedpassword= md5(password);
   
 
    var user=db.get('users').find({email:email}).value();
    var errors=[];
    if (!user){
        errors.push('User does not exist!');
    }
    else if (user.password!==hashedpassword){
        errors.push('Password is wrong!');
    }
    if (errors.length>0){
        res.render('auth/login',{
            errors: errors,  
            values: req.body
        });
        return;
    }   

    res.cookie('userId',user.id,{signed:true});
    res.redirect('/user');
}