const router=require("express").Router();;
const {allusr,Delete}=require("../controllers/admin.js");
router.get("/",allusr)
router.delete("/:id",Delete);
module.exports=router;