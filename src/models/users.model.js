import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";:

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    validate: [validators.notEmpty, 'Username is empty'],
    unique: true,
    lowercase: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: [
      {validator: validators.notEmpty, msg: "Email is empty."},
      {validator: validators.isEmai, msg: "Invalid email."}
    ],
    lowercase: true
  },
  fullName: {
    type: String,
    required: true,
    validate: [validators.notEmpty, 'Name is empty'],
    lowercase: true
  },
  avatar: {
    type: String,// cloudinary Url
    required: true,
  },
  password: {
    type: String,
    required: [true, "Password is Required!!"],
  },
  refreshToken: {
    type: String
  }
}, {timestamps: true});

userSchema.pre('save', async function(next){
  if(!this.isModified("password")) return next();

  await bcrypt.hash(this.password, 12).then(funnction(result){
    this.password = result
  }
  next()
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password)
}
  
export const User = mongoose.model("User", userSchema) ;
