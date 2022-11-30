const router=require("express").Router();
const {Add,See}=require("../controllers/CategoryControllr")
router.post("/",Add);
router.get("/",See);

module.exports=router;