var Transfer=require('../modules/transfer.module');
var Cart=require('../public/productFnc/cart');
module.exports.index=async function(req,res,next){
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    res.render('transfer/transfer',{
        csrfToken: req.csrfToken(),
        itemInCart:tmpSum
    });
}

module.exports.postTransfer=async function(req,res,next){
    var data={
        fromAcc:res.locals.user.id,
        destinationAcc: req.body.account,
        amount: parseInt(req.body.amount)
    }
    var transferData=new Transfer(data);
    await transferData.save();
    res.redirect('/transfer');
}