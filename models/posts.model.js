const mongoose = require('mongoose');
const PostSchema = mongoose.Schema({
username:{
    type:String,
    required:true,

},
title:{
  type:String,
  required:true,
},


content:{
 type:String,
 required:true,
},

DateAdded:{
    type:Date,
    default:Date.now,
}



})

module.exports= mongoose.model("Note",PostSchema);