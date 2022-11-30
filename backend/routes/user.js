const router=require("express").Router();
const {Update,Delete,Person}=require("../controllers/userController");
router.put("/:id",Update);
router.delete("/:id",Delete);
router.get("/:id",Person);
module.exports=router;