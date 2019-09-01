var db=require('../db');
var Cart=require('../public/productFnc/cart');


module.exports.index=function(req,res){
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=cart.countItem();
   
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var paginationIndex=[1,2,3];
    var products=db.get('products').value().slice(start,end);
    res.render('product/product',{
        products:products,
        paginationIndex: paginationIndex,
        itemInCart:tmpSum
    });
}