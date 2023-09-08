const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes'); 
const roomRoutes = require('./routes/roomRoutes'); 
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require("./config/db");
const app = express();
const colors = require('colors'); 
const cors = require('cors');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser= require("body-parser")
const multer = require('multer')
const path = require('path');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
connectDB();
app.use(cookieParser())
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.urlencoded({ extended: false }));
app.use('/images', express.static(path.join(__dirname,'images')));
app.use(session({
  key:"Cookie",
  secret:"123abc",
  resave:false,
  saveUninitialized:false
}))
const storage = multer.diskStorage({
  destination: path.join(__dirname, 'images'),
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    cb(null, originalName);
  }
});

const upload = multer({ storage: storage });
app.get('/' , (req ,res)=>{
  res.status(200).json({
    message:"Welcome to the book share api"
  })
})

const nocache = (_, resp, next) => {
  resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  resp.header('Expires', '-1');
  resp.header('Pragma', 'no-cache');
  next();
}
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use('/api/users', upload.any(),userRoutes);
app.use('/api/rooms', roomRoutes);
app.use(errorHandler);

app.get('/generateAgoraToken',nocache, (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const appId = '89da9174634f426da89fe958eb596946';
  const appCertificate = '4a9f5022f58f4500ac103809b85bf90c';
  const channelName = req.query.channelName;
  console.log(channelName)
  const uid = req.query.uid;
  if(!uid || uid === '') {
    return res.status(500).json({ 'error': 'uid is required' });
  }

  let expireTime = req.query.expiry;
  if (!expireTime || expireTime === '') {
    expireTime = 3600;
  } else {
    expireTime = parseInt(expireTime, 10);
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  let role;
  if (req.query.role === 'publisher') {
    role = RtcRole.PUBLISHER;
  } else if (req.query.role === 'audience') {
    role = RtcRole.SUBSCRIBER
  } else {
    return res.status(500).json({ 'error': 'role is incorrect' });
  }
  token = RtcTokenBuilder.buildTokenWithUid(appId, appCertificate, channelName, uid, role, privilegeExpireTime);
    console.log(token)
  res.json({ token, channelName });
});

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



    