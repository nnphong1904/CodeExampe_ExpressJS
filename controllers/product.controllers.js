var db=require('../db');

module.exports.index=function(req,res){
    var page=parseInt(req.query.page)||1;
    var start=(page-1)*8;
    var end=start+8;
    var paginationIndex=[1,2,3];
    var products=db.get('products').value().slice(start,end);
    res.render('product/product',{
        products:products,
        paginationIndex: paginationIndex
    });
}