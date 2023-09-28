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