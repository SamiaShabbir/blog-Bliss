const mongoose=require("mongoose");

const CatogorySchema= new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
},
  {timestamps:true}
);
module.exports= mongoose.model("Category", CatogorySchema)