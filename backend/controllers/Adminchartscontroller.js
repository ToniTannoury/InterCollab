const getMostRecentTopRooms = asyncHandler(async (req, res) => {
  try {
    // Find the maximum number of participants in any room
    const maxParticipants = await Room.aggregate([
      {
        $group: {