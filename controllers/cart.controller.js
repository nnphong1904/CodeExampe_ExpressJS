var Cart=require('../public/productFnc/cart');
var Session=require('../modules/session.module');
var Product=require('../modules/product.module');
module.exports.index=async function(req,res,next){
    var cart= new Cart(req.signedCookies.sessionId);
    var itemInCart= await cart.countItem();
    var listIdOfItems=(await Session.find({sessionId:req.signedCookies.sessionId}))[0].cart;


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
    // var count=db.get('sessions').find({sessionId:sessionId}).get('cart.'+productId,0).value();
    // db.get('sessions').find({sessionId:sessionId}).set('cart.'+productId,count+1).write();
    var path='cart.'+productId;
    var count= (await Session.find({sessionId:sessionId}))[0].cart[productId] || 0;
    console.log(count);
    var productCount={
        [path]:count+1
    };
    await Session.findOneAndUpdate(
        {sessionId:sessionId},
        {$set: productCount}
    );
    res.redirect('/product');   
}

