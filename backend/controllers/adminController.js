const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer');
let appMode = 'dark';

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
    }

    const emailTemplate = `
      <h1>Password Changed</h1>
      <p>Hello ${user.name},</p>
      <p>Your password has been successfully changed.</p>
      <p>If you didn't request this change, please contact our support team.</p>
      <p>Thank you for using our service.</p>
    `;

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: user.email,
      subject: 'Password Changed',
      html: emailTemplate, 
    };


    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);

    throw error;
  }
}

async function sendAdminLoginNotification(adminEmail, userEmail, userIpAddress, userTimestamp) {
  try {
    const emailTemplate = `
      <h1>New User Login</h1>
      <p>Hello Admin,</p>
      <p>A new user with the following details has logged in:</p>
      <ul>
        <li>User Email: ${userEmail}</li>
        <li>User IP Address: ${userIpAddress}</li>
        <li>Login Time: ${userTimestamp}</li>
      </ul>
      <p>Thank you for keeping track of user activity.</p>
    `;

    const mailOptions = {
      from: 'your_email@gmail.com',
      to: adminEmail,
      subject: 'New User Login',
      html: emailTemplate, 
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Admin notification email sent:', info.response);
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    
    throw error;
  }
}

function switchToLightMode() {
  (req, res) => {
    if (appMode === 'dark') {
      appMode = 'light';
      res.json({ message: 'Switched to light mode' });
    } else {
      res.status(400).json({ message: 'Already in light mode' });
    }
  });
  function switchToDarkMode(req, res) {
    if (appMode === 'light') {
      appMode = 'dark';
      res.json({ message: 'Switched to dark mode' });
    } else {
      res.status(400).json({ message: 'Already in dark mode' });
    }
  }
  
async function getMedianAgeByCategory(req, res) {
  try {
    const medianAgesByCategory = await Room.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'totalParticipants',
          foreignField: '_id',
          as: 'participants',
        },
      },
      {
        $unwind: '$participants',
      },
      {
        $group: {
          _id: '$category', 
          ages: { $push: '$participants.age' }, 
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          medianAge: {
            $cond: [
              { $eq: [{ $size: '$ages' }, 0] }, 
              null,
              {
                $let: {
                  vars: {
                    middle: { $floor: { $divide: [{ $size: '$ages' }, 2] } },
                  },
                  in: {
                    $cond: [
                      { $eq: [{ $mod: [{ $size: '$ages' }, 2] }, 0] },
                      {
                        $avg: [
                          { $arrayElemAt: ['$ages', { $subtract: ['$middle', 1] }] },
                          { $arrayElemAt: ['$ages', '$middle'] },
                        ],
                      },
                      { $arrayElemAt: ['$ages', '$middle'] },
                    ],
                  },
                },
              },
            ],
          },
        },
      },
    ]);

    res.status(200).json({ medianAgesByCategory });
  } catch (error) {
    console.error('Error fetching and calculating median ages by category:', error);


    res.status(500).json({ error: 'Server error' });
  }
}
async function addCoinsAndNotifyUser(req, res) {
  try {
    const { userId, coinsToAdd } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.coins += coinsToAdd;
  
      await user.save();
      const transporter = nodemailer.createTransport({
     
        service: 'Gmail',
        auth: {
          user: 'toni@gmail.com', 
          pass: '123456', 
        },
      });
      const mailOptions = {
        from: 'tonil@gmail.com', 
        to: user.email, 
        subject: 'Coins Added to Your Account',
        text: `Hello ${user.name},\n\nYou have received ${coinsToAdd} coins in your account. Enjoy!\n\nBest regards,\nYour App`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      
    res.status(200).json({ message: 'Coins added successfully', user });
  } catch (error) {
    console.error('Error adding coins and notifying user:', error);
    

    res.status(500).json({ error: 'Server error' });
  }
}

async function changeUserRatingById(req, res) {
  try {
    const { userId, newRating } = req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }   user.rating = newRating;

    await user.save();

    res.status(200).json({ message: 'User rating updated successfully', user });
  } catch (error) {
    console.error('Error changing user rating by ID:', error);
    
    res.status(500).json({ error: 'Server error' });
  }
}
async function getAverageAgeByCategory(req, res) {
  try {
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }    const averageAgesByCategory = await Room.aggregate([
      {
        $lookup: {
          from: 'users', 
          localField: 'totalParticipants',
          foreignField: '_id',
          as: 'participants',
        },
      },  {
        $unwind: '$participants',
      },
      
      {
        $group: {
          _id: '$category', 
          averageAge: { $avg: '$participants.age' }, 
        },
      },
    ]);
    res.status(200).json({ averageAgesByCategory });
  } catch (error) {
    console.error('Error fetching average ages by category:', error);

    res.status(500).json({ error: 'Server error' });
  }
}
async function updateRoomInfoById(req, res) {
  try {
    const roomId = req.params.id;
    const updatedInfo = req.body; 
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (updatedInfo.title) {
      room.title = updatedInfo.title;
    }
    if (updatedInfo.description) {
      room.description = updatedInfo.description;
    }

    if (updatedInfo.category) {
      room.category = updatedInfo.category;
    }

    if (updatedInfo.maxNumberOfParticipants) {
      room.maxNumberOfParticipants = updatedInfo.maxNumberOfParticipants;
    }
    await room.save();

    res.status(200).json({ message: 'Room information updated successfully', room });
  } catch (error) {
    console.error('Error updating room information by ID:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
async function kickUserFromRoom(req, res) {
  try {
    const roomId = req.params.roomId; 
    const userId = req.params.userId; 

app.put('/api/users/:id/block', blockUserById);

app.get('/api/users/grouped-by-age', groupUsersByAge);
app.get('/api/rooms/grouped-by-participants', getRoomsByAscendingParticipants);
app.get('/api/rooms/sendAdminLoginNotification', sendAdminLoginNotification);
app.get('/api/rooms/switchThemeToDark', switchToDarkMode);
app.get('/api/rooms/switchThemeToLight', switchToLightkMode);
app.get('/api/rooms/getRoomsWithMost', getRoomsWithMostParticipantsAndCategories)
app.get('/api/rooms/getMedianAgeByCategory', getMedianAgeByCategory)
app.get('/api/rooms/addCoinsAndNotifyUser', addCoinsAndNotifyUser)
app.get('/api/rooms/changeUserRatingById', changeUserRatingById)
app.get('/api/rooms/getAverageAgeByCategory', getAverageAgeByCategory)
