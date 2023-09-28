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
    })   .sort({ createdAt: -1 }) // Sort by createdAt in descending order for most recent
    .limit(10); // You can adjust the limit as needed

  if (mostRecentTopRooms.length === 0) {
    return res.status(404).json({ message: 'No top rooms found' });
  }
