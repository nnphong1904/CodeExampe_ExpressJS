var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var transferSchema= new Schema({
    fromAcc:String,
    destinationAcc:String,
    amount:Number
});

var Transfer=mongoose.model('transfer',transferSchema,'transfer');
module.exports=Transfer;    