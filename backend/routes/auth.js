const router=require("express").Router();
const {regvali,register,login,logout}=require("../controllers/authcontrollor");
router.post("/signup",regvali,register);
router.post("/login",login);
router.post("/logout",logout);
module.exports= router;