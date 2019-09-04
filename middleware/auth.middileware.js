
var User=require('../modules/user.module');
module.exports.requiredAuth=async function(req,res,next){
     if (!req.signedCookies.userId){
         res.redirect('/auth/login');
         return;
     }
    var user= (await User.find({_id:req.signedCookies.userId}))[0];
     if (!user){
         res.redirect('/auth/login');
         return;
     }

     res.locals.user=user;
     next(); 
};