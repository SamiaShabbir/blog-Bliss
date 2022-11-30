const mongoose= require("mongoose");
module.exports= async()=>{
    const connectionParams={
        useNewUrlParser:true,
        useUnifiedTopology:true
    };
       try{
        await mongoose.connect("mongodb://localhost:27017/blogsite",connectionParams);
        console.log("connected to database successfully")
       }catch(error){
        console.log("could no connect to database")
        console.log(error)
      }
}