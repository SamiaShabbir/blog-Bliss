const User=require("../models/user");
const Post=require("../models/post");
const {body,validationResult}=require("express-validator");
module.exports.regvali=[
    body("comment").not().isEmpty().withMessage("comment is required")
];

exports.posts=async(req,res,next)=>{
    const newPost= await new Post(req.body);
    try {
        const savedPost=await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error)
    }
    next()
}
exports.Update=async(req,res,next)=>{
     try {
        const post= await Post.findById(req.params.id);
        if(post.username=== req.body.username){
         try {
            const postUpdated= await Post.findByIdAndUpdate(
                req.params.id,
            {
                $set:req.body,
            },
            {new:true}
            )
            res.status(200).json(postUpdated);
         } catch (error) {
            res.status(500).json(error);
         }
        }else{
            res.status(401).json("Dont have access");
        }
     } catch (error) {
        res.status(500).json(error);
     }
     next()
}

exports.Delete=async(req,res,next)=>{
    try {
       const post= await Post.findById(req.params.id);
       if(post.username=== req.body.username){
        try {
              await post.delete();
              res.status(200).json("Post is deleted!")
        } catch (error) {
           res.status(500).json(error);
        }
       }else{
           res.status(401).json("Dont have access");
       }
    } catch (error) {
       res.status(500).json(error);
    }
    next()
}

exports.post=async(req,res,next)=>{
try {
    const post= await Post.findById(req.params.id)
    // .populate('comments','text')
    // .populate('comments,postedBy','_id name');
    res.status(200).json(post);
    console.log(post);
} catch (error) {
    res.status(500).json(error);
    console.log(error)
}
next()
}

exports.Allposts=async(req,res,next)=>{
    const username=req.query.user;
    const cate=req.query.categories;
    try {
        let posts;
        if(username){
            posts= await Post.find({username:username}
                ) 
        }else if(cate) {
            posts=await Post.find({
                categories:{  
                $in:[cate],}
            })
        }else{
          posts=await Post.find();
        }
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
        console.log(error)
    }
next()
}
exports.create=async(req,res,next)=>{
   let postId=req.params.id;
   let comment=req.body.comment;
       postedBy= req.body.userId;
      try{
           Post.findByIdAndUpdate(
            {_id:postId},
            {
                $push:{comments:comment},
                new:true
            }
           )
           return res.status(200).send({
            message:'comment successfully added',
             comment
           }) 
            } catch (error) {
                res.status(500).json(error);
                console.log(error)
            }
   next();
}
exports.uncomment=async(req,res,next)=>{
    let comment= req.body.comment;
    
    Post.findByIdAndUpdate(
     req.body.postId,
     {$pull:{comments:{_id:comment._id}}},
     {new:true}
    ).populate("comments.postedBy","_id name")
    .populate("postedBy","_id")
    .exec((err,result)=>{
     if(err){
         res.status(400).json({error:err})
     }else{
         res.status(200).json(result)
     }
    })
    next()
 }