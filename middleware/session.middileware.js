var db=require('../db');
var shortid=require('shortid');

module.exports.setSessionId=function(req,res,next){
    var sessionId=shortid.generate();
    if (!req.signedCookies.sessionId){
        res.cookie('sessionId',sessionId,{signed:true});
        db.get('sessions').push({sessionId:sessionId}).write();
    }
    next();
}
