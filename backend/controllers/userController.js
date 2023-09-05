const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')


const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res)=>{ 
 
  const {email , name , password} = req.body
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.status(422)
    throw new Error(errors.array()[0].msg)
  }

  if(!name || !email || !password){
    res.status(400)
    throw new Error('Please include all fields')
  }

  const userExists = await User.findOne({email: email})

  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password , salt)

  const user = await User.create({
    name ,
    email , 
    password: hashedPassword
  })

  if(user){
    res.status(201).json({
      message:"User Signed Up Successfully",
      data:{
        _id: user._id,
        name : user.name,
        email: user.email ,
        token: generateToken(user._id)
      }
    })
  }else{
    res.status(400)
    throw new Error('Invalid User Data')
  }  
})

const loginUser =asyncHandler (async (req, res)=>{
  const {email , password } = req.body

  const user = await User.findOne({email})
  if(user === null){
    res.status(401)
    throw new Error("Invalid Credentials")
  }
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    res.status(422)
    throw new Error(errors.array()[0].msg)
  }

  const token = generateToken(user._id)
  console.log(token)
  if(user && (await bcrypt.compare(password , user.password))){
   
    res.status(200).json({
      _id: user._id,
      name : user.name,
      email: user.email ,
      token: token
    })
  }else{
    res.status(401)
    throw new Error("Invalid Credentials")
  }
})

const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.query;
  if (!query) {
    res.status(400);
    throw new Error('Search query is required');
  }

  const users = await User.find({
    $or: [
      { name: { $regex: new RegExp(query, 'i') } },
      { email: { $regex: new RegExp(query, 'i') } },
    ],
  });

  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(404);
    throw new Error('No users found matching the search query');
  }
});


const getMe = asyncHandler(async (req, res)=>{
  res.status(200).json(req.user)
})


const generateToken = (id)=>{
  return jwt.sign({id} , process.env.JWT_SECRET , {
    expiresIn:'30d'
  } )
}



module.exports = {
  registerUser,
  loginUser,
  getMe,
  searchUsers
}