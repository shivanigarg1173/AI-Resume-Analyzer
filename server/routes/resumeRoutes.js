const express = require("express");
const router = express.Router();
const {uploadResume} = require("../controllers/resumecontroller");
const upload = require("../config/multer.js");
const{auth} = require("../middlewares/auth.js");


router.get("/test",(req,res)=>{
    res.send("resume route working");
});
router.post( "/upload",auth,
    upload.single("resume"),
    uploadResume
);

module.exports = router;