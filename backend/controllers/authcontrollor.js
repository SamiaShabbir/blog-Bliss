const User=require("../models/user");
const {body,validationResult}=require("express-validator");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken");
const maxAge=30*60*60;
const jwtSecret="362fb9b85a670829c30e06a48a57f499f0130c259e0acea35013f43d79fb2ffe94bf6d"

module.exports.regvali=[
    body("username").not().isEmpty().withMessage("Name is required"),
    body("email").not().isEmpty().withMessage("Email is Required"),
    body("password").isLength({min:6}).withMessage("password length must be 6")
];
const createToken=(id)=>{
  return jwt.sign({id},jwtSecret,{
    expiresIn: maxAge
  }
  )
}
exports.register=async(req,res,next)=>{
  try {
     const user= await User.findOne({email:req.body.email});
     const errors=validationResult(req);
      if(!errors.isEmpty()){
           return res.json(errors.array())
           } 
         else if(user){
        return res.status(403).json({message:"User with this email already exist"})
         }else{
          const salt = await bcrypt.genSalt(10);
          const hashedPass = await bcrypt.hash(req.body.password, salt);
          const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass,
          });
            const user = await newUser.save();
            // const token= createToken(user._id,user.username,user.role,user.profilepic);
            // res.cookie("user",token,{httpOnly:true,
            //   maxAge:maxAge,
            //   sameSite:"none",
            //   secure:true   
            // }).status(200).json(user.id);
           return res.status(200).json(user.id);
    }
    }catch(err){
         return res.status(500).json(err);
          console.log(err)
        
    }
    next()
  }            

exports.login=async(req,res)=>{
        try {
            const { email, password } = req.body
            const user= await User.findOne({email: req.body.email});
            !user && res.status(400).json("email does not exist");
            const validated=await bcrypt.compare(req.body.password, user.password);
            !validated &&res.status(400).json("password not matched");

            bcrypt.compare(req.body.password,user.password).then((result)=>{
                     if(result) {
                    //     // const token=createToken(user._id,user.username,user.role)
                        // res.cookie("user", token, {
                        //     httpOnly: true,
                        //     maxAge: maxAge, 
                        //   });
                         const {password,...others}=user._doc
                         return res.status(200).json(others);
                        }else {
                           return res.status(400).json({ message: "Login not succesful" });
                          }
                    });
        } catch (error) {
         return res.status(500).json(error); 
          console.log(error);
        }
    }
  
exports.adminlogin=async(req,res,next)=>{
  try {
      const { email, password } = req.body
      const user= await User.findOne({email: req.body.email});
      !user && res.status(400).json("email does not exist");
      const validated=await bcrypt.compare(req.body.password, user.password);
      !validated &&res.status(400).json("password not matched");

      bcrypt.compare(req.body.password,user.password).then((result)=>{
               if(result) {
                  const token=createToken(user._id,user.username,user.role)
                  res.cookie("admin", token, {
                      httpOnly: true,
                      maxAge: maxAge, 
                    });
                   const {password,...others}=user._doc
                    res.status(200).json(others);
                  }else {
                      res.status(400).json({ message: "Login not succesful" });
                    }
              });
  } catch (error) {
    res.status(500).json(error);  
  }
}

exports.logout=async(req,res)=>{
  res.clearCookie("user",{
    sameSite:"none",
    secure:true
  }).status(200).json("user is logged out")
}