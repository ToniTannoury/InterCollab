const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer');

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
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');

const blockUserById = asyncHandler(async (req, res) => {
  const userId = req.params.id; 
  const blockStatus = req.body.blocked; 

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { blocked: blockStatus },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error('Error blocking/unblocking user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

const editUserProfile = asyncHandler(async (req, res) => {
  const userId = req.params.id; 
  const updatedProfile = req.body;
  body

  try {

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (updatedProfile.email && !isValidEmail(updatedProfile.email)) {
      return res.status(400).json({ message: 'Invalid email address' });
    }

    if (updatedProfile.password) {
      updatedProfile.password = await hashPassword(updatedProfile.password);
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error editing user profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

function isValidEmail(email) {
  return 
}

async function hashPassword(password) {
  return 
}
async function sendPasswordChangedEmail(userId) {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }const emailTemplate = `
    <h1>Password Changed</h1>
    <p>Hello ${user.name},</p>
    <p>Your password has been successfully changed.</p>
    <p>If you didn't request this change, please contact our support team.</p>
    <p>Thank you for using our service.</p>
  `;
app.put('/api/users/:id/block', blockUserById);

app.get('/api/users/grouped-by-age', groupUsersByAge);
app.get('/api/rooms/grouped-by-participants', getRoomsByAscendingParticipants);
