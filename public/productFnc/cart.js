var db=require('../../db');
function Cart(sessionId){
    this.sessionId=sessionId
}
Cart.prototype.countItem=function(){
    var obj=db.get('sessions').find({sessionId:this.sessionId}).get('cart').value();
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }
    return sum;
}
module.exports=Cart;