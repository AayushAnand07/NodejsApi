const jwt = require('jsonwebtoken');

const checkToken=(req,res,next)=>{
 let token =req.headers["authorization"]
 token = token.slice(7,token.length);
 if(token){
     jwt.verify(token,process.env.SECRET_KEY, (err,decoded)=>{

        if(err){
            return res.json({
                status:false,
                msg:err,
            })

        }
        else{
            req.decoded=decoded;
            
            // res.json(req.decoded.username)
        }
     });

 }
 else{
     return res.json({
         status:false,
         msg:"token not provided",
     });

 }
next();
};
module.exports={checkToken:checkToken};