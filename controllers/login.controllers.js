var db=require('../db');

module.exports.login=function(req,res){
    res.render('auth/login');
}
module.exports.postLogin=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var user=db.get('users').find({email:email}).value();
    var errors=[];
    if (!user){
        errors.push('User does not exist!');
    }
    else if (user.password!==password){
        errors.push('Password is wrong!');
    }
    if (errors.length>0){
        res.render('auth/login',{
            errors: errors,  
            values: req.body
        });
        return;
    }   
    res.redirect('/user');
}