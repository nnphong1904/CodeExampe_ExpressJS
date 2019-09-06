var Cart=require('../public/productFnc/cart');
var Product=require('../modules/product.module');

module.exports.index=async function(req,res){
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    var currentPage=req.query.page|| '1';
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var paginationIndex=[1,2,3];
    var products= (await Product.find()).slice(start,end);
    res.render('product/product',{
        products:products,
        paginationIndex:paginationIndex,
        itemInCart:tmpSum,
        currentPage:currentPage
    });
}

module.exports.search=async function(req,res){
    var name=req.query.name;
    var cart= new Cart(req.signedCookies.sessionId);
    var tmpSum=await cart.countItem();
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var products= (await Product.find()).slice(start,end);
    var matchedProducts;
        if (name===''){
            matchedProducts=[];
        }
        else {
            matchedProducts=products.filter(function(product){
                return product.name.toLowerCase().indexOf(name.toLowerCase()) > -1;
            })
        }
 
    res.render('product/product',{
        products:matchedProducts,
        itemInCart:tmpSum
    });

}