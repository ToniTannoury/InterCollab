const express = require("express")
const router = express.Router()
const {registerUser , loginUser , getMe ,  searchUsers} = require('../controllers/userController')
const {protect} = require('../middleware/authMiddleware')
const {check , body} = require('express-validator')


router.post('/' ,
[
  check('email').isEmail().withMessage('Please enter a valid email'),
  body("password" , 'Please enter a password with only numbers and text and at least 5 characters').isLength({min:5}).isAlphanumeric(),
  body("confirmPassword").custom((value , {req})=>{
    if(value !== req.body.password){
      throw new Error("Passwords have to match")
    }
    return true
  })
]
  ,registerUser)

router.post('/login' ,
[
  check('email').isEmail().withMessage('Please enter a valid email'),
  body("password" , 'Please enter a password with only numbers and text and at least 5 characters').isLength({min:5}).isAlphanumeric()
]
 ,loginUser)

router.get('/me', protect, getMe)

router.get('/searchUsers', protect, searchUsers)


module.exports = router