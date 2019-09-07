var Cart=require('../public/productFnc/cart');
var Session=require('../modules/session.module');
var Product=require('../modules/product.module');
module.exports.index=async function(req,res,next){
    var cart= new Cart(req.signedCookies.sessionId);
    var itemInCart= await cart.countItem();
    var session=(await Session.find({sessionId:req.signedCookies.sessionId}))[0];
    var listIdOfItems;
     if (!session){
            listIdOfItems={};
     }
     else{
        listIdOfItems=(await Session.find({sessionId:req.signedCookies.sessionId}))[0].cart;
     }


    var listItems=[];
        for (itemId in listIdOfItems){
                var item=(await Product.find({_id:itemId}))[0];
                item.amount=listIdOfItems[itemId];                   
                listItems.push(item);
             
        }
    
    res.render('cart/cart',{
        itemInCart:itemInCart,
        listItems:listItems
    });
}
module.exports.addToCart=async function(req,res,next){
    var productId=req.params.productId;
    var sessionId=req.signedCookies.sessionId;
    var path='cart.'+productId;
    var count= (await Session.find({sessionId:sessionId}))[0].cart[productId] || 0;
    var productCount={
        [path]:count+1
    };
    await Session.findOneAndUpdate(
        {sessionId:sessionId},
        {$set: productCount}
    );
    res.redirect('/product');   
}

