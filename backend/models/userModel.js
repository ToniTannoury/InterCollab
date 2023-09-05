const mongoose = require('mongoose')


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required:[true , 'Please add a name']
  },
  email:{
    type: String,
    required:[true , 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required:[true , 'Please add a password']
  },
  phone: {
    type: String,
    required:false
  },
  followings:{
    type: [mongoose.Schema.Types.ObjectId],
    required:false,
    default:[]
  },
  followers:{
    type: [mongoose.Schema.Types.ObjectId],
    required:false,
    default:[]
  },
  about: {
    type: String,
    required:false
  },
  rating:{
    type: Number,
    required:false,
    default:5
  },
  profile_picture:{
    type:String,
    required:false,
    default:"emptyProfile.png"
  }

},
{
  timestamps: true
}) 

module.exports = mongoose.model("User" , userSchema)