var db=require('../db');

module.exports.index=function(req,res){
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var imgURL='https://i.pinimg.com/564x/6a/87/4a/6a874a3a99fb06d305bf8931c4f30129.jpg';
    var products=db.get('products').value().slice(start,end);
    res.render('product/product',{
        products:products
    });
}