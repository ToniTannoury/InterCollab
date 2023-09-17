const { Socket } = require("socket.io");
const { v4: uuidV4 } = require('uuid');
const Room = require('../models/roomModel');
const User = require('../models/userModel');
const mongoose = require('mongoose')
const rooms = {};

const roomHandler = (socket) => {
 
  const createRoom = ({ roomId }) => {
    socket.emit('room-created', { roomId });
    // console.log(`user created the room ${roomId}`);
  };

  const leaveRoom = async ({ roomId, peerId }) => {
    try {
      // console.log("User disconnected");
      socket.to(roomId).emit("user-disconnected", peerId);

      const room = await Room.findById(roomId);

      if (!room) {
        console.error("Room not found.");
        return;
      }

      room.currentParticipants = room.currentParticipants.filter((participant) => {
        const objectId1 = new mongoose.Types.ObjectId(peerId);
        console.log(participant._id.toString() != objectId1.toString())
        console.log(participant._id)
        console.log(objectId1)
        return participant._id.toString() !== objectId1.toString();
      });

      await room.save();
      console.log(room.currentParticipants)
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };

  const joinRoom = async ({ roomId, peerId }) => {
    console.log(`User joined the room ${roomId}`);
    socket.join(roomId);

    const user = await User.findById(peerId);
    // console.log(user)
    const room = await Room.findById(roomId);
    if (!user || !room) {
      console.error("User or room not found.");
      return;
    }

    room.currentParticipants.push(user);
    await room.save();
    if (!room.totalParticipants.includes(user)) room.totalParticipants.push(user)

    setTimeout(() => {
      console.log(`User ${peerId} joined`);
      socket.to(roomId).emit("user-joined", {
        peerId,
      });
    }, 2000);

    
    socket.emit("get-users", {
      roomId,
      participants: room.currentParticipants,
    });
    
      // socket.on('chatMessage', (props) => {
      //   const {message , roomName , userName} = props
      //   console.log(roomId)
      //   console.log(userName)
      //   console.log(message)
      //   console.log("Naaaaaaaameeeeeeeeeeee")
      //   socket.join(roomId)
        
      //   setTimeout(() => {
      //     console.log(Object.keys(socket.rooms))
      //     socket.emit('Messages',{ message , userName});
      //   }, 2000);
       
      // })

   
    
    socket.on('disconnect', () => {
      console.log("Plzzzzzzzzzzzzzzzz disconnected");
      leaveRoom({ roomId, peerId });
    });
  };
  
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

module.exports = roomHandler;
