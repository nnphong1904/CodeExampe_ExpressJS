
var Session=require('../../modules/session.module');
function Cart(sessionId){
    this.sessionId=sessionId
}
Cart.prototype.countItem=async function(){
    var obj=(await Session.find({sessionId:this.sessionId}))[0].cart;
  
        var sum=0;
            for (var value in obj){
                sum+=obj[value];
            }

    return sum;
}
module.exports=Cart;