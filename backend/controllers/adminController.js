const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')

const groupUsersByAge = asyncHandler(async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: "$age", 
          users: { $push: "$$ROOT" }, 
        },
      },
    ]);

    const groupedUsers = {};
    result.forEach((group) => {
      groupedUsers[group._id] = group.users;
    });

    res.status(200).json(groupedUsers);
  } catch (error) {
    console.error('Error grouping users by age:', error);
    res.status(500).json({ error: 'Server error' });
  }
})
const getRoomsByAscendingParticipants = asyncHandler(async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate('user')
      .sort({ totalParticipants: 1 }) // Sort by totalParticipants in ascending order
      .exec();

    res.status(200).json({ rooms });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  
});
const deleteUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndRemove(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
const blockUserById = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { blocked: blockStatus },
    { new: true }
  );

  // Check if the user was found and updated
  if (!updatedUser) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Respond with the updated user object (including the block status)
  res.status(200).json(updatedUser);

app.get('/api/users/grouped-by-age', groupUsersByAge);
app.get('/api/rooms/grouped-by-participants', getRoomsByAscendingParticipants);
