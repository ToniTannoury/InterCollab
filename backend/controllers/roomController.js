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


const searchRoomsByCategory = asyncHandler(async (req, res) => {
  const { category, page = 1, pageSize = 10 } = req.query;

  const query = {};

  if (category) {
    const categoryRegex = new RegExp(category, 'i'); 

    query.category = categoryRegex;
  }

  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(pageSize),
      populate: 'user'
    };

    const rooms = await Room.paginate(query, options);

    if (rooms.docs.length === 0) {
      res.status(404).json({ message: 'No rooms found matching the criteria.' });
    } else {
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const searchRoomsByTitle = asyncHandler(async (req, res) => {
  const { title, page = 1, pageSize = 10 } = req.query;

  const query = {};

  if (title) {
    const titleRegex = new RegExp(title, 'i'); 

    query.title = titleRegex;
  }

  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(pageSize),
      populate: 'user'
    };

    const rooms = await Room.paginate(query, options);

    if (rooms.docs.length === 0) {
      res.status(404).json({ message: 'No rooms found matching the criteria.' });
    } else {
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
const searchRoomsByUserName = asyncHandler(async (req, res) => {
  const { userName, page = 1, pageSize = 10 } = req.query;

  const query = {};

  if (userName) {
    const userNameRegex = new RegExp(userName, 'i'); 

    query['user.name'] = userNameRegex;
  }

  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(pageSize),
      populate: 'user'
    };

    const rooms = await Room.paginate(query, options);

    if (rooms.docs.length === 0) {
      res.status(404).json({ message: 'No rooms found matching the criteria.' });
    } else {
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createRoom,
  searchRoomsByCategory,
  searchRoomsByTitle,
  searchRoomsByUserName
}
