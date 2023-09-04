const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes'); 
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
// Connect to database
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

 
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use('/api/users', upload.any(),userRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



    