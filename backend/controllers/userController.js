const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult} = require('express-validator')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const Room = require('../models/roomModel')

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
  if(user && (await bcrypt.compare(password , user.password))){
   
    res.status(200).json({
      _id: user._id,
      name : user.name,
      email: user.email ,
      token: token,
      admin:user.isAdmin
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
const followUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const currentUser = req.user;

  if (currentUser._id.toString() === userId) {
    res.status(400).json({ message: "You can't follow yourself." });
    return;
  }

  const userToFollow = await User.findById(userId);

  if (!userToFollow) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (currentUser.followings.includes(userId)) {
    res.status(400).json({ message: 'You are already following this user.' });
    return;
  }

  currentUser.followings.push(userId);
  userToFollow.followers.push(currentUser._id);

  await currentUser.save();
  await userToFollow.save();

  res.status(200).json({ message: 'You are now following this user.' });
});

// Unfollow a user
const unfollowUser = asyncHandler(async (req, res) => {
  const userId = req.params.id; // ID of the user to unfollow
  const currentUser = req.user; // The user who wants to unfollow

  if (currentUser._id.toString() === userId) {
    res.status(400).json({ message: "You can't unfollow yourself." });
    return;
  }

  const userToUnfollow = await User.findById(userId);

  if (!userToUnfollow) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  if (!currentUser.followings.includes(userId)) {
    res.status(400).json({ message: 'You are not following this user.' });
    return;
  }

  currentUser.followings = currentUser.followings.filter((id) => id.toString() !== userId);
  userToUnfollow.followers = userToUnfollow.followers.filter((id) => id.toString() !== currentUser._id.toString());

  await currentUser.save();
  await userToUnfollow.save();

  res.status(200).json({ message: 'You have unfollowed this user.' });
});

const generateToken = (id)=>{
  return jwt.sign({id} , process.env.JWT_SECRET , {
    expiresIn:'30d'
  } )
}

// Define a route for updating user information


// Controller function to update user information
const updateUser = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const updateFields = req.body;

  // Retrieve the user document from the database
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  // Update the user document with the fields provided in the request body
  for (const field in updateFields) {
    if (updateFields.hasOwnProperty(field)) {
      user[field] = updateFields[field];
    }
  }

  try {
    // Save the updated user document to the database
    await user.save();
    res.status(200).json({ message: 'User information updated successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user information', error: error.message });
  }
});

const coinTransfer = asyncHandler(async(req , res)=>{
  
  const enteringRoom =await Room.findById(req.body.roomId).populate("user")
  const roomCreator = enteringRoom.user
  const sender = await User.findById(req.user._id)
  sender.coins = sender.coins  -  req.body.amount
  await sender.save()
  roomCreator.coins = roomCreator.coins  +  req.body.amount
  await roomCreator.save()

})

const changeProfilePicture = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const profilePicture = req.files[0];
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  user.profile_picture = profilePicture.originalname; 
  try {
    await user.save();
    res.status(200).json({ message: 'Picture updated', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile picture', error: error.message });
  }
});
const getUserById = asyncHandler(async (req, res) => {
  const {userId} = req.query; 
  const user = await User.findById(userId);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.status(200).json(user);
});
const bundles = new Map([
  [
    1 , {priceInCents:100 , name:"1.67 dolar bundle"}
  ],
  [
    2 , {priceInCents:550 , name:"5.55 dolar bundle"}
  ],
  [
    3 , {priceInCents:1000 , name:"10 dolar bundle"}
  ],
])
const createCheckoutSession = asyncHandler(async(req , res)=>{

  const customer = await stripe.customers.create({
    metadata:{
      userId:req.user.id,
      bundle:JSON.stringify(req.body.bundle)  
    }
  })
  try {
    const bundle = bundles.get(req.body.bundle)
    const stripeReq = {
      price_data:{
        currency:"usd",
        product_data:{
          name: bundle.name
        },
        unit_amount:bundle.priceInCents
      },
      quantity:1,
    }
   
    let session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      mode:"payment",
      customer:customer.id,
      line_items:[stripeReq],
      success_url:`${process.env.CLIENT_URL}`,
      cancel_url:`${process.env.CLIENT_URL}`,
    }).catch(err=>console.log(err))
    res.json({url:session.url})
  } catch (error) {
    res.status(500).json({error:e.message})
  }
  
})
const rateCreator = asyncHandler(async(req , res)=>{
  const {creator_id , rating} = req.body
  const creator = await User.findById(creator_id)
  let currentNumRatings = creator.ratings+1
  let currentAverage =creator.rating;
  let newRating = rating
  let currentSum = currentAverage * currentNumRatings;
  let newSum = currentSum + newRating;
  currentNumRatings++;
  let newAverage = newSum / currentNumRatings;
  
  creator.rating = newAverage
  creator.ratings = currentNumRatings-1
  await creator.save()
})

module.exports = {
  registerUser,
  loginUser,
  getMe,
  searchUsers,
  followUser,
  unfollowUser,
  updateUser,
  changeProfilePicture,
  getUserById,
  createCheckoutSession,
  coinTransfer,
  rateCreator
  
}
