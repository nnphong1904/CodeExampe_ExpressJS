var db=require('../db');
var Session=require('../modules/session.module');
var shortid=require('shortid');

module.exports.setSessionId=async function(req,res,next){
    var sessionId=shortid.generate();
    var sessionData={
        sessionId:sessionId,
        cart:{}
    };
    var newSession=await(new Session(sessionData));
    if (!req.signedCookies.sessionId){
        res.cookie('sessionId',sessionId,{signed:true});
        await newSession.save();
    }
    next();
}
