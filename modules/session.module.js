var mongoose= require('mongoose');
mongoose.set('useFindAndModify', false);
var Schema= mongoose.Schema;

var sessionProduct= new Schema({
    sessionId:String,
    cart:{type:Schema.Types.Mixed, default:{}}
},{minimize:false});

var Session=mongoose.model('session',sessionProduct,'sessions');
module.exports=Session;    