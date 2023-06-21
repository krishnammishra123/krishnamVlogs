const User = require("../model/UserModel");
const Contact = require("../model/ContactModel");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken"); 

const Register = async (req, res) => {
  const { name, email, password } = req.body;
    if (!name || !email || !password) {
    return res.status(400).json({ message: "All field are required" });
  }
  try {
    const existUser = await User.findOne({ email });
    if (existUser) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();
      res.status(200).json({ message: "User registered successfully" });
    }
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

const Login= async (req, res) => {
 try {
   const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All field are required" });
    }
   const existUser = await User.findOne({ email: email });
   if (existUser) {
     const matchPassword = await bcrypt.compare(password, existUser.password);
     if (!matchPassword) {
       return res.status(400).json({ error: "invalid login credentials" });
     } else {
       const token = await existUser.generateAuthToken();
       return res
         .status(200)
         .json({ message: "User Login seccessfully", user: existUser, token });
     }
   } else {
     return res.status(404).json({ error: "invalid login credentials" });
   }
 } catch (err) {
   return res.status(500).json({ error: "Something is wrong" });
 }
}


const addContact = async (req, res) => {
  const { name, email, addMessage } = req.body;
   if (!name || !email || !addMessage) {
     return res.status(400).json({ message: "All field are required" });
   }
  try {
    const add = new Contact({ name, email, addMessage });
    await add.save();
    return res.status(200).json({ message: "Contact information saved successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

//email config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "krishnammishra1426@gmail.com",
    pass: "kxbdfdrxafmarerc",
  },
});
//send Email Link for Reset password
const sendpasswordlink = async (req, res) => {
  const { email } = req.body;
 
  if (!email) {
    res.status(400).json({ message: "Enter your EmailId" });
  }
  try {
    const existUser = await User.findOne({ email: email });
    if (existUser) {
       const token = jwt.sign({ _id: existUser._id },process.env.JWT_SECRET_KEY, {
         expiresIn: "120s",
       });
      const setusertoken = await User.findByIdAndUpdate({ _id: existUser._id }, { verifytoken: token }, { new: true });
      if (setusertoken) {
        var mailOptions = {
          from: "krishnammishra1426@gmail.com",
          to: email,
          subject: "Sending Email For Password Reset",
          text: `This Link Valid For 2 Minutes http://localhost:3000/dashboard/forgotpassword/${existUser._id}/${setusertoken.verifytoken}`,
        }

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            // console.log(error);
            res.status(404).json({ message: "Email not found" });
          } else {
            console.log("Email sent: " + info.response);
             res.status(200).json({ message: "Password reset link send Successfully in your Email" });
          }
        });
      }
    } else {
      return res.status(404).json({ message: "Email not found"});
    }
  } catch (err) {
      return res.status(500).json({ message: "Invalid User" });
  }
};


//verify user for forgot password time
const forgotpassword  = async ( req, res) => {
  const { id, token } = req.params;
  try {
    const existUser = await User.findOne({ _id:id, verifytoken:token })
    const VerifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (existUser && VerifyToken._id) {
      res.status(200).json({ message: existUser });
    } else {
       res.status(400).json({ message:"User Not Exist" });
    }
  } catch (err) {
    res.status(400).json({ message: "Something is Worng" });
 }
};


//changePassword
const changePassword = async(req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
    const existUser = await User.findOne({ _id:id, verifytoken:token });
    
    const VerifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
    if (existUser && VerifyToken._id) {
      const newpassword = await bcrypt.hash(password, 12)
      const setnewuserpassword=await User.findByIdAndUpdate({_id:id},{password:newpassword})
      setnewuserpassword.save();
      res.status(200).json({message:"Password Succesfully Update"});
    } else {
      res.status(400).json({ message: "! Token is expired generate new Link" });
    }
  } catch (err) {
     res.status(500).json({ message: "Something is wrong..." });
  }
}


module.exports = { Register, Login, addContact, sendpasswordlink,forgotpassword,changePassword };








//inside Register make addConatct there store name, email, addMessage  
// const addContact = async (req, res) => {
//   try {
//     const { name, email, addMessage } = req.body;
//     // Find the user by their ID or any other unique identifier
//     const userId = req.user._id; // Assuming you have implemented user authentication and obtained the user ID from the request

//     // Create the contact object
//     const contact = {
//       name,
//       email,
//       addMessage,
//     };

//     // Find the user and push the contact to the addContact array
//     const user = await User.findById(userId);
//     user.addContact.push(contact);
//     await user.save();

//     res.status(200).json({ message: "Contact added successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to add contact" });
//   }
// };

// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");

// const UserSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       trim: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       trim: true,
//     },
//     addContact: [
//       {
//         name: {
//           type: String,
//           required: [true, "Contact Name is required"],
//           trim: true,
//         },
//         email: {
//           type: String,
//           required: [true, "Contact Email is required"],
//           trim: true,
//         },
//         addMessage: {
//           type: String,
//           required: [true, "Contact Message is required"],
//           trim: true,
//         },
//       },
//     ],
//     role: {
//       type: String,
//       enum: ["admin", "user"],
//       default: "user",
//     },
//   },
//   { timestamps: true }
// );

// UserSchema.methods.generateAuthToken = async function () {
//   try {
//     let token = jwt.sign(
//       { _id: this._id, role: this.role },
//       process.env.JWT_SECRET_KEY,
//       { expiresIn: "1d" }
//     );
//     await this.save();
//     return token;
//   } catch (err) {
//     console.log(err);
//   }
// };

// module.exports = mongoose.model("User", UserSchema);
