const Room = require('../models/roomModel');
const User = require('../models/userModel');
const mongoose = require('mongoose')

const roomHandler = (socket) => {
  const createRoom = ({ roomId }) => {
    socket.emit('room-created', { roomId });
  };
};

module.exports = roomHandler;
