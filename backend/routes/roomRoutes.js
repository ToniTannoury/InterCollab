const express = require("express")
const router = express.Router()
const { createRoom , searchRoomsByCategory ,searchRoomsByTitle , searchRoomsByUserName} = require('../controllers/roomController') 
 
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect , createRoom)
router.get('/searchRooms', protect, searchRoomsByCategory );
router.get('/searchRoomsByTitle', protect, searchRoomsByTitle );
router.get('/searchRoomsByUserName', protect, searchRoomsByUserName );

module.exports = router