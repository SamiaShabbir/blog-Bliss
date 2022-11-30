const User=require("../models/user");
const Post=require("../models/post");
const bcrypt= require("bcrypt");


exports.Update=async(req, res, next)=> {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
             { new: true });
            res.status(200).json(updateduser);
            console.log(updateduser);
        } catch (error) {
            res.status(500).json(error);
            console.log(error);
        }
    } else {
        res.status(401).json("access denied");
    }
}  
exports.Delete=async(req,res,next)=>{
    if (req.body.userId === req.params.id){
       try {
        const user=await User.findById(req.params.id);
       try {
        await Post.deleteMany({username: user.username});
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("user deleted successfully")
       } catch (error) {
        res.status(500).json(error);
        console.log(error);
       }
       } catch (error) {
        res.status(404).json("user no found!");
        console.log(error);
       }
    }
}
exports.Person=async(req,res,next)=>{
try {
    const user=await User.findById(req.params.id);
    const {password,...others}=user._doc;
    res.status(200).json(others);
} catch (err) {
    res.status(500).json(err);
}
}
