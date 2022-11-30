const User=require("../models/user");
const Post=require("../models/post");
exports.allusr=async(res,next)=>{
    try{
       const users=  await User.find();
       const {password,...others}=users._doc;
       res.status(200).json(others);
    }catch(err){ 
        console.log(err)
    }
    next()
}
exports.Delete=async(req,res,next)=>{
        const user=await User.findById(req.params.id);
       try {
        await Post.deleteMany({username: user.username});
        user.delete();
        res.status(200).json("user deleted successfully")
       } catch (error) {
        res.status(500).json(error);
       }
       next()
    }
