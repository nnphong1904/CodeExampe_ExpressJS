var db=require('../db');
var Cart=require('../public/productFnc/cart');
module.exports.index=function(req,res,next){
    var cart= new Cart(req.signedCookies.sessionId);
    var itemInCart= cart.countItem();
    var listIdOfItems=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();

    var listItems=[];
        for (itemId in listIdOfItems){
                var item=db.get('products').find({id:itemId}).value();
                item.amount=listIdOfItems[itemId];                   
                listItems.push(item);
        }
    res.render('cart/cart',{
        itemInCart:itemInCart,
        listItems:listItems
    });
}
module.exports.addToCart=function(req,res,next){
    var productId=req.params.productId;
    var sessionId=req.signedCookies.sessionId;
    var count=db.get('sessions').find({sessionId:sessionId}).get('cart.'+productId,0).value();
    db.get('sessions').find({sessionId:sessionId}).set('cart.'+productId,count+1).write();
    res.redirect('/product');
}

