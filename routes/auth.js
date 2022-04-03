const router = require("express").Router();
const User=require("../models/User");
const cryptojs= require('crypto-js')
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");


const middleware =require("../middleware");
dotenv.config();
router.post("/register",async (req,res)=>{
    const newUser =await new User({
        username:req.body.username,
        email:req.body.email,
        password: cryptojs.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString(),

    });
    try{
        const saveUser = await newUser.save();
        console.log(saveUser);
        res.status(200).json("Success");
       
        
    }
    catch(err){
        res.status(500).json(err);
        console.log(err);
    }
    
});


router.post("/login" , (req,res)=>{
 User.findOne({username:req.body.username},(err,result)=>{
     if(err){
         res.status(403).json(err);
     }
  else if(result === null){
   res.status(403).json("No user found");
  }
  else if( cryptojs.AES.decrypt(result.password,process.env.SECRET_KEY).toString(cryptojs.enc.Utf8) === req.body.password)
  {
     
      let token = jwt.sign({username:req.body.username}, process.env.SECRET_KEY,{
          expiresIn:"24h",
      });
      res.status(200).json({
          msg:"success",
          token:token,
      });
    //  res.json(user._doc);
  }
  else{
      res.status(403).json("password incorrect")
}
//! here focus
 }).catch((err)=>{
   res.status(500);
 });

});


router.route("/checkname/:username").get(async (req,res) =>{
     await User.findOne({username:req.params.username},(err,result)=>{
         if(err) return res.status(404).json(err);

         if(result == null){
             res.status(200).json({msg:"unique username"});
         }
         else {
             console.log(result);
             return res.status(400).json({msg:"Username already in use "})
         }
        
    })
});

router.route("/checkmail/:email").get(async (req,res) =>{
    await User.findOne({email:req.params.email},(err,result)=>{
        if(err) return res.status(404).json(err);

        if(result == null){
            res.status(200).json({msg:"unique useremail"});
        }
        else {
            console.log(result);
            return res.status(400).json({msg:"User email already in use "})
        }
       
   })
});






router.route("/checkuser").post((req,res)=>{
    
     User.find({username:req.body.username, email:req.body.email},(err,result)=>{

        if(err){
          return res.status(404).json(err);
        }

         if(result.length === 0 ){
            console.log(result.length)
            return res.status(200).json({
                msg:"unique user",
                Status: "true"
         });
        }
        else{
            console.log(result.length);
            return res.status(401).json({Status: "false"});
        }
        // if(result!=null){
        //     console.log(result);
        // res.status(400).json("User already exists");
        // }
  });
});

router.route("checkemail/:email").post( async (req,res)=>{
await User.findOne({email: req.params.email},(err,result)=>{

    if(err) return res.status(404).json(err);

    if(result == null){
        res.status(200).json({msg:"unique useremail"});
    }
    else {
        console.log(result);
    return res.status(400).json({msg:"User email already in use "})
    }
})

})

router.route("/checkUsername").post( async (req,res)=>{
    await User.findOne({username: req.body.username},(err,result)=>{
        if(err) return res.status(404).json(err);
    
        if(result == null){
            
            res.status(200).json({msg:"unique username"});
        }
        else {
            console.log(result);
        return res.status(400).json({msg:"Username already in use "});

        }
    })
    
    })
    



module.exports= router;