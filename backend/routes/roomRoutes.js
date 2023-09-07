const express = require("express")
const router = express.Router()
const { createRoom , searchRoomsByCategory ,searchRoomsByTitle , searchRoomsByUserName ,searchRoomsByType,searchRoomById} = require('../controllers/roomController') 
 
const {protect} = require('../middleware/authMiddleware')

router.route('/').post(protect , createRoom)
router.get('/searchRooms', protect, searchRoomsByCategory );
router.get('/searchRoomsByTitle', protect, searchRoomsByTitle );
router.get('/searchRoomsByUserName', protect, searchRoomsByUserName );
router.get('/searchRoomsByType', protect, searchRoomsByType );
router.get('/searchRoomById', protect, searchRoomById );

module.exports = router