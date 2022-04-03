const router = require("express").Router();
const middleware =require("../middleware");
const post = require('../models/posts.model');


// Fetching users all posts after authentication
router.route("/posts/list").get(middleware.checkToken, async (req,res)=>{
    try{
    const posts = await post.find({ username:req.decoded.username})
    res.status(200).json(posts);
    console.log(posts[0].id);
    }
    catch(e){
      res.status(400);
    }
})

router.route("/posts/add").post(middleware.checkToken,async(req,res)=>{
       
    await post.deleteOne({id:req.body.id})
    const newpost = await new post({
   id:req.body.id,
   username:req.body.username,
   title:req.body.title,
   content:req.body.content
   
});
await newpost.save();
const response = {message: "New note created"};
res.json(response)

});

router.route("/posts/delete").post(middleware.checkToken,async (req,res)=>{
    await post.deleteOne({id:req.body.id});
    const response = {message : "this note hase been deleted "};
    res.json(response);
});


// Searching other users after logging in
router.route("/posts/getAllPosts").get(middleware.checkToken,async (req,res)=>{

    try {
        const Allposts = await post.find();
        res.status(200).json(Allposts);
    }
    catch (e){
        res.status(400);
    }
});

module.exports= router;
