const mongoose = require("mongoose"); 
const jwt = require("jsonwebtoken"); 

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    verifytoken: {
      type: String,
    },
  },
  { timestamps: true }
);


UserSchema.methods.generateAuthToken=async function(){
    try{
      let token = jwt.sign({ _id: this._id,role: this.role}, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
      await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}

module.exports = mongoose.model("User",UserSchema);




 