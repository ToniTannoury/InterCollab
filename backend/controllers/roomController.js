const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Room = require('../models/roomModel')


const createRoom = asyncHandler(async (req, res)=>{
  
  const {  description , title  ,type , category , maxNumberOfParticipants , priceToEnter} = req.body
  
  if(!description){
    res.status(400)
    throw new Error('Please add a description')
  }
  
  const user = await User.findById(req.user.id)

  if(!user){
    res.status(401)
    throw new Error('User not found')
  }
  if(type!=="paid"){
    
  }
 
  const room = type === "paid" ? await Room.create({
      description,
      user: req.user.id,
      maxNumberOfParticipants,
      category,
      title,
      type,
      priceToEnter
  }):await Room.create({
    description,
    user: req.user.id,
    maxNumberOfParticipants,
    category,
    title,
    type,
    
})


  res.status(200).json(room)
})

const getTop5RoomsByTotalParticipants = asyncHandler(async (req , res) => {
  try {
    const top5Rooms = await Room.find().populate('user')
      .sort({ totalParticipants: -1 })
      .limit(5);
      res.status(200).json({ topRooms: top5Rooms })
    return top5Rooms;
  } catch (error) {
    console.log(error.message)
  }
});


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
const searchRoomById = asyncHandler(async (req, res) => {
  const { roomId } = req.query;

  try {
    const room = await Room.findById(roomId).populate('user');

    if (!room) {
      res.status(404).json({ message: 'Room not found.' });
    } else {
      res.status(200).json(room);
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

  try {
    const users = await User.find({ name: { $regex: userName, $options: 'i' } });
    
    const userIds = users.map(user => user._id);

    const options = {
      page: parseInt(page),
      limit: parseInt(pageSize),
      populate: 'user'
    };

    const rooms = await Room.paginate({ 'user': { $in: userIds } }, options);

    if (rooms.docs.length === 0) {
      res.status(404).json({ message: 'No rooms found matching the criteria.' });
    } else {
      res.status(200).json(rooms);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const searchRoomsByType = asyncHandler(async (req, res) => {
  const { type, page = 1, pageSize = 10 } = req.query;

  const query = {};

  if (type) {
    const typeRegex = new RegExp(type, 'i'); 

    query.type = typeRegex;
  }

  try {
    const options = {
      page: parseInt(page),
      limit: parseInt(pageSize),
      populate: 'user'
    };

    const rooms = await Room.paginate(query, options);

    if (rooms.docs.length === 0) {
      res.status(404).json({ message: 'No room found for the specific criteria' });
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
  searchRoomsByUserName,
  searchRoomsByType,
  searchRoomById,
  getTop5RoomsByTotalParticipants
}
