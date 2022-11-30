const router=require("express").Router();
const {posts,Update,Delete,post,Allposts,create,uncomment,like,unlike}=require("../controllers/postControllr");
router.post("/create",posts);
router.put("/:id", Update);
router.delete("/:id", Delete);
router.get("/:id",post);
router.get("/",Allposts);
router.put("/:id/comment",create);
router.put("/:id/uncomment",uncomment);
module.exports=router;