var db=require('../db');
var shortid=require('shortid');

module.exports.index=function(req,res){
    res.render('user/index',{
        users: db.get('users').value()
    })
};

module.exports.search=function(req,res){
    var q=req.query.q;
    var matchedUser=db.get('users').value().filter(function(user){
        return user.name.toLowerCase().indexOf(q.toLowerCase()) !==-1;
    })
    res.render('user/index',{
        users: matchedUser,
        q:q
    });

};

module.exports.create=function(req,res){
    res.render('user/create');
};

module.exports.view=function(req,res){
    var id= req.params.id;
     var user=db.get('users').find({id:id}).value();
    res.render('user/view',{
        user:user
    });
};

module.exports.postCreate=function(req,res){
    req.body.id=shortid.generate();
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