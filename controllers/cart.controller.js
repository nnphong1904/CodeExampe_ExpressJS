var db=require('../db');
module.exports.index=function(req,res,next){
    res.send('Developing....');
}
module.exports.addToCart=function(req,res,next){
    var productId=req.params.productId;
    var sessionId=req.signedCookies.sessionId;
    var count=db.get('sessions').find({sessionId:sessionId}).get('cart.'+productId,0).value();
    db.get('sessions').find({sessionId:sessionId}).set('cart.'+productId,count+1).write();
    res.redirect('/product');
}

