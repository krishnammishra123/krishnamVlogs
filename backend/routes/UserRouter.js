const express = require("express");
const multer = require("multer");
const verifyUser = require("../middleware/authenticate");
const { validuser, uploadBlogs, fetchBlog, fetchBlogAll, BlogDetails, BlogDelete } = require("../controller/UserController");
 

const router = express.Router();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "image/");  
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Configure multer middleware for file upload
const upload = multer({ storage: storage });

//user verify
router.get("/verifyuser", verifyUser, validuser);

 //upload blog
router.post("/uploadblogs",verifyUser,upload.single("image"),uploadBlogs);

//get blog
router.get("/fetchblog", verifyUser, fetchBlog);

//get blogfor all
router.get("/blog", fetchBlogAll);

//get blogfor all
router.get("/blogpost/:id", BlogDetails);

//deleteblog
router.delete("/deleteblog/:id", BlogDelete);

 

module.exports = router;
