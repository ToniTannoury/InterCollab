const { Socket } = require("socket.io");
const { v4: uuidV4 } = require('uuid');
const Room = require('../models/roomModel');
const User = require('../models/userModel');
const mongoose = require('mongoose')
const rooms = {};

const roomHandler = (socket) => {
 
  const createRoom = ({ roomId }) => {
    socket.emit('room-created', { roomId });
  };
  const closeRoom = async ({ roomId , peerId }) => {
    try {
      const room = await Room.findById(roomId);
  
      if (!room) {
        throw new Error('Room not found');
      }
      socket.to(roomId).emit('room-closed', { roomId , peerId });
  
      await room.deleteOne({ _id: roomId });
      socket.leave(roomId)
      console.log('Room deleted successfully.');
    } catch (error) {
      console.error('Error closing room:', error.message);
    }
  };

  const leaveRoom = async ({ roomId, peerId }) => {
    try {
      console.log("User disconnected");
      socket.to(roomId).emit("user-disconnected", peerId);
      socket.leave(roomId)
      const objectId1 = new mongoose.Types.ObjectId(peerId);
  
      const updatedRoom = await Room.findOneAndUpdate(
        { _id: roomId },
        {
          $pull: { currentParticipants: { _id: objectId1 } },
        },
        { new: true }
      );
  
      if (!updatedRoom) {
        console.error("Room not found.");
        return;
      }
  
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
    console.log(1)
   console.log(user._id)
    if (!room.totalParticipants.includes(user._id)) room.totalParticipants.push(user._id)
    await room.save();
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
    socket.on('leave-room', () => {
      console.log("Plzzzzzzzzzzzzzzzz disconnected");
      leaveRoom({ roomId, peerId });
    });

    socket.on('CloseRoom', () => {
      console.log("closing room");
      closeRoom({ roomId , peerId });
    });

    socket.on('disconnect', () => {
      console.log("Plzzzzzzzzzzzzzzzz disconnected");
      leaveRoom({ roomId, peerId });
    });
  };
  
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

module.exports = roomHandler;
