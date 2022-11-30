require('dotenv').config()
const express = require("express");
const app= express();
const connection= require("./db");
const authRoutes= require("./routes/auth");
const adminRoutes= require("./routes/admin");
const userRoutes=require("./routes/user");
const postRoutes=require("./routes/post");
const CategoryRoutes=require("./routes/Categories");
const cookieParser = require("cookie-parser");
const multer=require("multer");
const cors = require('cors');
const path = require('path');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/images",express.static(path.join(__dirname,"/images")))
connection();
app.use(express.json());
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
    },
    filename:(req,file,cb)=>{
        cb(null,req.body.name)
    },
});
const upload= multer({ storage:storage});
app.post("/api/pic",upload.single("file"),(req,res)=>{
    res.status(200).json("file has been uploaded")
}) 



app.use("/api", authRoutes);
app.use("/api",adminRoutes);
app.use("/api/user",userRoutes);
app.use("/api/post",postRoutes);
app.use("/api/categories",CategoryRoutes);

app.listen(3002, function(){
    console.log("connected to server :!");  
});
