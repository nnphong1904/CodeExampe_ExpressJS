var db=require('../db');

var shortid=require('shortid');
var cartControllers=require('./cart.controller');   


module.exports.index=function(req,res){
    var obj=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    res.render('user/index',{
        users: db.get('users').value(),
        itemInCart:sum
    })
};

module.exports.search=function(req,res){
    var q=req.query.q;
    var matchedUser=db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
    })
    var obj=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    res.render('user/index',{
        users: matchedUser,
        q:q,
        itemInCart:sum
    });
};

module.exports.create=function(req,res){
    var obj=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    res.render('user/create',{itemInCart:sum});
};

module.exports.view=function(req,res){
    var obj=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    var id= req.params.id;
     var user=db.get('users').find({id:id}).value();
    res.render('user/view',{
        user:user,
        itemInCart:sum
    });
};

module.exports.postCreate=function(req,res){
    req.body.id=shortid.generate();
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
    db.get('users').push(req.body).write();
    res.redirect('/user'); 
};