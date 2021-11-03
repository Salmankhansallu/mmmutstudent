require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

require("./db/conn");
const hbs = require("hbs");
const user = require("./model/usermessage");
const { exists } = require("./model/usermessage");

const staticpath = path.join(__dirname,"../public");
const templatepath = path.join(__dirname,"../templates");
const partialepath = path.join(__dirname,"../templates/partials");
// app.use("/css",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
// app.use("/js",express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
// app.use("/jq",express.static(path.join(__dirname,"../node_modules/jquery/dist")));
app.use(express.static(staticpath));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set("view engine","hbs");
hbs.registerPartials(partialepath);
app.set("views",templatepath);



app.get("/",(req,res)=>{
    res.render("index");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.post("/contact",async (req,res)=>{
    try{
        const Email=req.body.email;
        const Phone=req.body.phone;
        const useremail=await user.findOne({email:Email},{_id:0}).select({email:1});
        const userphone=await user.findOne({phone:Phone},{_id:0}).select({phone:1});
    //    console.log(useremail);
    //    console.log(userphone);
   
         if(useremail==null){
        
          if(userphone==null){
            
            const registereduser= new user({
            
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                message:req.body.message
    
            })
            const registered= await registereduser.save();
            
            res.status(500).render("index");
            


         }
         else{
             res.send("Phone Number Already Exists....!");
         }
        }
        else{
            res.send("Email Already Exists...!");
        }
      

        
    }catch(e){
        
        res.status(201).send(e);
    }


})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/service",(req,res)=>{
    res.render("service");
})
app.get("/gallery",(req,res)=>{
    res.render("gallery");
})

const port=process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`listen to the port no ${port}`);
})