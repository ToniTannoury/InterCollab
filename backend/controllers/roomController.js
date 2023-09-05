const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Room = require('../models/roomModel')


const createRoom = asyncHandler(async (req, res)=>{
  console.log(req.body)
  const {  description , title  ,type , category , maxNumberOfParticipants} = req.body
  
  if(!description){
    res.status(400)
    throw new Error('Please add a description')
  }
  
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
 
  const room = await Room.create({
      description,
      user: req.user.id,
      maxNumberOfParticipants,
      category,
      title,
      type
  })

  console.log(room)

  res.status(200).json(room)
})


module.exports = {
  createRoom,
}
