require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const hbs = require("hbs");
const user = require("./model/usermessage");

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
        const registereduser= new user({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message

        })
        const registered= await registereduser.save();
        // res.status(201).render("index");
        res.status(500).render("index");

    }catch(e){
        // res.status(500).send(e);
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