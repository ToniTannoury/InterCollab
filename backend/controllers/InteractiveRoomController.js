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
  
    } catch (error) {
      console.error("Error leaving room:", error);
    }
  };
};

module.exports = roomHandler;
