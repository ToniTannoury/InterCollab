const Room = require('../models/roomModel');
const User = require('../models/userModel');
const mongoose = require('mongoose')


const roomHandler = (socket) => {
 
  const createRoom = ({ roomId }) => {
    socket.emit('room-created', { roomId });
  };

  const leaveRoom = async ({ roomId, peerId }) => {
    try {
      console.log("User disconnected");
      socket.to(roomId).emit("user-disconnected", peerId);
  
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
  
      console.log(updatedRoom.currentParticipants);
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };
  

  const joinRoom = async ({ roomId, peerId }) => {
    console.log(`User joined the room ${roomId}`);
    socket.join(roomId);

    const user = await User.findById(peerId);
    const room = await Room.findById(roomId);
    if (!user || !room) {
      console.error("User or room not found.");
      return;
    }

    room.currentParticipants.push(user);
   console.log(room.totalParticipants.includes(user._id))
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
    socket.on('disconnect', () => {
      console.log("Plzzzzzzzzzzzzzzzz disconnected");
      leaveRoom({ roomId, peerId });
    });
  };
  
  socket.on("create-room", createRoom);
  socket.on("join-room", joinRoom);
};

module.exports = roomHandler;
