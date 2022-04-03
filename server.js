const express = require('express')
const app = express();
const mongoose  = require('mongoose');
const bodyparser = require('body-parser');
const dotenv = require("dotenv");
const authroute = require("./routes/auth");
const postroute = require('./routes/posts')

dotenv.config();

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json());
//const note = require('./models/notes.model');
mongoose.connect(process.env.MONGO_URL).then(()=>{

   
    app.get('/',(req,res)=>{

        res.status(200).send("This is the home page ");
    })
   
}).catch((err)=>{
  console.log(err);
});
app.use("/api/auth",authroute);
app.use("/api/auth",postroute);


app.listen(3000,()=>{
    console.log("server has started :")
})