
var User=require('../modules/user.module');

var Cart=require('../public/productFnc/cart');


module.exports.index=async function(req,res){
    var users= await User.find();
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    res.render('user/index',{
        users: users,
        itemInCart:tmpSum
    })
};

module.exports.search=async function(req,res){
    var users= await User.find();
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
 
    var q=req.query.q;
    var matchedUser;
   
     if (q===''){
        matchedUser=[]
     }
     else {
        matchedUser=users.filter(function(user){
            return user.name.toLowerCase().indexOf(q.toLowerCase()) >-1;
        })
     }    
     for (user of matchedUser){
         user.avatar='/uploads/'+ user.avatar.split('\\').slice(1);
     }
    
        res.render('user/index',{
            users: matchedUser,
            q:q,
            itemInCart:tmpSum
        });
};

module.exports.create=async function(req,res){
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    res.render('user/create',{itemInCart:tmpSum});
};

module.exports.view=async function(req,res){
    var id= req.params.id;
    var user= (await User.find({_id:id}))[0];
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
   

    res.render('user/view',{
        user:user,
        itemInCart:tmpSum
    });
};

module.exports.postCreate=function(req,res){
    req.body.avatar=req.file.path.split('\\').slice(1).join('\\');
    var errors=[];
    if (!req.body.name){
        errors.push('Name is empty');
    }
    if (!req.body.phone){
        errors.push('Phone is empty');
    }
    if (errors.length>0){
        res.render('user/create',{
            errors:errors,
            values: req.body
        });
        return;
    }
    var newUser=new User(req.body);
    newUser.save();
    res.redirect('/user'); 
};