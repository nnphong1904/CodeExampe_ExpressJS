var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var userSchema= new Schema({
    name:String,
    phone:String,
    email:String,
    password:String,
    avatar:String
});

var User=mongoose.model('user',userSchema,'users');
module.exports=User;    