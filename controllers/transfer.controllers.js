var db=require('../db');
module.exports.index=function(req,res,next){
    res.render('transfer/transfer',{
        csrfToken: req.csrfToken()
    });
}

module.exports.postTransfer=function(req,res,next){
    var data={
        fromAcc:res.locals.user.id,
        destinationAcc: req.body.account,
        amount: parseInt(req.body.amount)
    }
    db.get('transfer').push(data).write();
    res.redirect('/transfer');
}