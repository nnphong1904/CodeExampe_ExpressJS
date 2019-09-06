
var Session=require('../../modules/session.module');
function Cart(sessionId){
    this.sessionId=sessionId
}
Cart.prototype.countItem=async function(){
    var session=(await Session.find({sessionId:this.sessionId}))[0];
    if(!session){
       return 0;
    }
    else {
        var result=0;
        var itemsInCart=session.cart;
        for (itemId in itemsInCart){
            result+=itemsInCart[itemId];  
        }
     return result;
    }
}
module.exports=Cart;