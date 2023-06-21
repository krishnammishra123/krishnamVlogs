const express = require("express");
const { Register, Login, addContact, sendpasswordlink, forgotpassword, changePassword } = require("../controller/IndexController");
 
const router=express.Router();

//user register
router.post("/register",Register);

//user  login
router.post("/login", Login);

//user  login
router.post("/addcontact", addContact);
;
//reset password
router.post("/sendpasswordlink", sendpasswordlink);

//forgotpassword
router.get("/forgotpassword/:id/:token", forgotpassword);

//post new password
router.post("/changepassword/:id/:token", changePassword);

module.exports = router;
