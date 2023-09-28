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
  