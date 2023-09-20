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

app.get('/api/users/grouped-by-age', groupUsersByAge);
