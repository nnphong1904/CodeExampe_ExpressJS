var db=require('../db');

module.exports.index=function(req,res){
    var obj=db.get('sessions').find({sessionId:req.signedCookies.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var paginationIndex=[1,2,3];
    var products=db.get('products').value().slice(start,end);
    res.render('product/product',{
        products:products,
        paginationIndex: paginationIndex,
        itemInCart:sum
    });
}