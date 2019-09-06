
var Product=require('../../modules/product.module');

module.exports.index=async function(req,res){
    var products=await Product.find();
    res.json(products);
}