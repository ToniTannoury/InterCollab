const getMostRecentTopRooms = asyncHandler(async (req, res) => {
  try {
    const maxParticipants = await Room.aggregate([
      {
        $group: { _id: null,
          maxParticipants: { $max: '$totalParticipants' },
        },
      },
    ]);

    if (maxParticipants.length === 0) {
      return res.status(404).json({ message: 'No rooms found' });
    }
    const maxParticipantCount = maxParticipants[0].maxParticipants;


    const mostRecentTopRooms = await Room.find({
      totalParticipants: maxParticipantCount,
    })   .sort({ createdAt: -1 })
    .limit(10); 
  if (mostRecentTopRooms.length === 0) {
    return res.status(404).json({ message: 'No top rooms found' });
  }    res.status(200).json({ mostRecentTopRooms });
} catch (error) {
  console.error('Error fetching most recent top rooms:', error);
  res.status(500).json({ error: 'Server error' });
}
});

const addParticipantToRoom = asyncHandler(async (req, res) => {
  try {
    const roomId = req.params.roomId; 
    const userId = req.body.userId; 
    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    if (room.currentParticipants.length >= room.maxNumberOfParticipants) {
      return res.status(400).json({ message: 'Room is full' });
    }

    if (room.currentParticipants.includes(userId)) {
      return res.status(400).json({ message: 'User is already a participant in the room' });
    }   room.currentParticipants.push(userId);

    await room.save();

    res.status(200).json({ message: 'Participant added to the room' });
  } catch (error) {
    console.error('Error adding participant to room:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
const getMostRatedCreators = async (req, res) => {
  try {
    const mostRatedCreators = await User.find()
      .sort({ rating: -1 })
      .limit(10);
      if (mostRatedCreators.length === 0) {
        return res.status(404).json({ message: 'No rated creators found' });
      }
      const ages = mostRatedCreators.map((creator) => creator.age);
      const totalAges = ages.reduce((sum, age) => sum + age, 0);
      const averageAge = totalAges / mostRatedCreators.length;
      ages.sort((a, b) => a - b);
      const medianAge =
        ages.length % 2 === 0
          ? (ages[ages.length / 2 - 1] + ages[ages.length / 2]) / 2
          : ages[Math.floor(ages.length / 2)];

          const response = {
            mostRatedCreators: mostRatedCreators.map((creator) => ({
              name: creator.name,
              age: creator.age,
            })),
            averageAge,
            medianAge,
          };
          res.status(200).json(response);
        } catch (error) {
          console.error('Error fetching most rated creators:', error);
          res.status(500).json({ error: 'Server error' });
        }
      });
      const calculateRoomAges = async () => {
        try {
          const rooms = await Room.find().populate('currentParticipants');
          const roomAges = rooms.map((room) => {
            const participantAges = room.currentParticipants.map(
              (participant) => participant.age
            );
            const totalAge = participantAges.reduce((sum, age) => sum + age, 0);
            const averageAge = participantAges.length
              ? totalAge / participantAges.length
              : 0;
              participantAges.sort((a, b) => a - b);
      const medianAge =
        participantAges.length % 2 === 0
          ? (participantAges[participantAges.length / 2 - 1] +
              participantAges[participantAges.length / 2]) /
            2
          : participantAges[Math.floor(participantAges.length / 2)];
          return {
            room: room.name, 
            averageAge,
            medianAge,
          };
        });
        roomAges.sort((a, b) => b.averageAge - a.averageAge);
        const topRooms = roomAges.slice(0, 10);

        return topRooms;
      } catch (error) {
        console.error('Error calculating room ages:', error);
        throw error; 
      }
    };

    const getTopRatedUsersWithRooms = async () => {
      try {users.forEach((user) => {
        user.totalRatings = user.rooms.reduce((total, room) => total + room.rating, 0);
      });
      users.sort((a, b) => b.totalRatings - a.totalRatings);
      const topRatedUsers = users.slice(0, 10);

      return topRatedUsers;
    } catch (error) {
      console.error('Error fetching top-rated users with rooms:', error);
      throw error;
    }
  };
  const getTopRoomsByCategory = async (category) => {
    try {
      const targetCategory = category; 
      const topRooms = await Room.find({ category: targetCategory })
      .sort({ rating: -1 }) 
      .limit(10); 
      return topRooms;
    } catch (error) {
      console.error('Error fetching top rooms by category:', error);
      throw error;
    }
    async function getMostRatedCreatorsByMonth(req , res) {
      try {
        const result = await Room.find(req.rooms)
        const mostRatedCreatorsByMonth = await Promise.all(
          result.map(async (entry) => {
            const mostRatedRoom = await Room.findOne({
              createdAt: {
                $gte: new Date(entry._id.year, entry._id.month - 1, 1),
                $lt: new Date(entry._id.year, entry._id.month, 1),
              },
              rating: entry.maxRating,
            }).populate('creator');
            if (mostRatedRoom) {
              return {
                month: entry._id.month,
                year: entry._id.year,
                maxRating: entry.maxRating,
                creator: mostRatedRoom.creator,
              };
            }
            return mostRatedCreatorsByMonth.filter((entry) => entry !== null);
          } catch (error) {}
            console.error('Error fetching most-rated creators by month:', error);
            throw error;
      getCreatorWithMostParticipants() {
              try {
     
                  const users = await User.find().populate({
                    path: 'rooms',
                    select: 'totalParticipants',
                  });
                  let mostParticipants = null;
                  let maxTotalParticipants = 0;
                  users.forEach((user) => {
                    const totalParticipants = user.rooms.reduce(
                      (total, room) => total + room.totalParticipants,
                      0
                    );
                    if (totalParticipants > maxTotalParticipants) {
                      maxTotalParticipants = totalParticipants;
                      mostParticipants = user;
                    }
                  });
                  
    if (!mostParticipants) {
      return {
        message: 'No rooms found',
      };
    }    return {
      mostParticipants: {
        name: mostParticipants.name,
        age: mostParticipants.age,
        totalParticipants: maxTotalParticipants,
      },
    };
  } catch (error) {
    console.error('Error fetching creator with most participants:', error);
    throw error;
  }
  async function getUsersConsistentlyEnteringRoomsByCreator(creatorId) {
    try {  const creator = await User.findById(creatorId);

      if (!creator) {
        return {
          message: 'Creator not found',
        };
      }const usersConsistentlyEnteringRooms = [];

      for (const roomId of creator.rooms) {
        const room = await Room.findById(roomId);
  
        if (!room) {
          continue;
        }
        const roomParticipants = room.participants || [];
        for (const participantId of roomParticipants) {
          const participant = await User.findById(participantId);
  
          if (participant && participant.rooms.includes(roomId)) {
            usersConsistentlyEnteringRooms.push(participant);
          }
        }
      }
      const uniqueUsers = Array.from(new Set(usersConsistentlyEnteringRooms));
    return {
      users: uniqueUsers,
      creatorBio: creator.bio,
    };
  } catch (error) {
    console.error('Error getting users consistently entering rooms:', error);
    throw error;
  }
}
const getMostSearchedCreatorWithRooms = async () => {
  try {
    const mostSearchedCreator = await User.findOne().sort({ searches: -1 });
    if (!mostSearchedCreator) {
      return {
        message: 'No most searched creator found',
      };
    }
    const creatorRooms = await Room.find({ creator: mostSearchedCreator._id });
    if (creatorRooms.length === 0) {
      return {
        creator: {
          name: mostSearchedCreator.name,
          age: mostSearchedCreator.age,
          searches: mostSearchedCreator.searches,
        },
        rooms: [],
      };
    }'
    const roomInfo = await Promise.all(
      creatorRooms.map(async (room) => {'
      const participantAges = room.currentParticipants.map(
        (participant) => participant.age
      );
    app.get('/api/chart/getTopRoomsByCategory', getTopRoomsByCategory)
app.get('/api/charts/getTopRatedUsersWithRooms', getTopRatedUsersWithRooms)
app.get('/api/charts/calculateRoomAges', calculateRoomAges)
app.get('/api/charts/getMostRatedCreators', getMostRatedCreators)
app.get('/api/charts/getMostRatedCreatorsByMonth', getMostRatedCreatorsByMonth)
app.get('/api/charts/getCreatorWithMostParticipants', getCreatorWithMostParticipants)
app.get('/api/charts/getUsersConsistentlyEnteringRoomsByCreator', getUsersConsistentlyEnteringRoomsByCreator)