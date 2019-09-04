var Cart=require('../public/productFnc/cart');
var Product=require('../modules/product.module');

module.exports.index=async function(req,res){
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    console.log(tmpSum);
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var paginationIndex=[1,2,3];
    var products= (await Product.find()).slice(start,end);
    res.render('product/product',{
        products:products,
        paginationIndex:paginationIndex,
        itemInCart:tmpSum
    });
}