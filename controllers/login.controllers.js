
var User=require('../modules/user.module');
var md5 = require('md5');
var Cart=require('../public/productFnc/cart');
module.exports.login=async function(req,res){
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    res.render('auth/login',{itemInCart:tmpSum});
}
module.exports.postLogin=async function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var hashedpassword= md5(password);

    var user=(await User.find({email:email}))[0];
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