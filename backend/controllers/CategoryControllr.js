const Category=require("../models/category");
exports.Add=async(req,res,next)=>{
     const newCatgory= new Category(req.body);
     try {
        const savedcategory= await newCatgory.save();
        res.status(201).json(savedcategory);
     } catch (err) {
        res.status(500).json(err);
     }
     next()
}
exports.See=async(req,res,next)=>{
   try {
      const category= await Category.find();
      res.status(200).json(category);
   } catch (err) {
      res.status(500).json(err);
   }
   next()
}
