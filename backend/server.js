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
const { Server } = require("socket.io")
const http = require("http")
const { createRoom } = require('./controllers/InteractiveRoomController');
const roomHandler = require('./controllers/InteractiveRoomController');
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
const User = require("./models/userModel")
// const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
connectDB();
app.use(cookieParser())
app.use(cors());
const bundles = new Map([
  [
    1 , {priceInCents:100 , name:"1.67 dolar bundle"}
  ],
  [
    2 , {priceInCents:550 , name:"5.55 dolar bundle"}
  ],
  [
    3 , {priceInCents:1000 , name:"10 dolar bundle"}
  ],
])

let endpointSecret 
endpointSecret= "whsec_99de9c0d940a9b0193357d7eceb01c10eada61cc61d31f4eca53346669109e4d";
// Define the webhook route without body parsing middleware
app.post('/webhook', express.raw({type: 'application/json'})  ,(req, res) => {
  const sig = req.headers['stripe-signature'];

  let data;
  let eventType;

  let event;
  try {
    // Parse the raw request body as a Buffer
    const rawBody = req.body;
    event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  data = event.data.object;
  eventType = event.type;

  if(eventType==="checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then(
      async(customer)=>{
   
        const user =await User.findById(customer.metadata.userId)
        user.coins = user.coins + bundles.get(+customer.metadata.bundle).priceInCents
        await user.save()
      }
    ).catch(err=>console.log(err))
  }
  

  // Handle the webhook event based on its type here.
  // Example: if (eventType === 'payment_intent.succeeded') { ... }

  res.send().end();
});
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
app.use('/api/rooms', roomRoutes);
app.use(errorHandler);


const server = http.createServer(app)

const io = new Server(server,{
  cors:{
    origin:"*",
    methods:["GET" ,"POST"]
  }
})
io.on("connection" , (socket)=>{
  socket.on('join',async ({roomId}) => { 
    
    socket.join(roomId.toString()); 
  });
  const emitMessage = ({message , roomId , userName})=>{
    socket.to(roomId.toString()).emit('Messages',{ message , userName})
  }
  const emitScreenShare = ({status , roomId })=>{
    socket.to(roomId._id).emit('screenSharing',{ status })
  }
  const stopShare = ({mediaShareStatus , roomId })=>{
    socket.to(roomId).emit('mediaSharing',{ mediaShareStatus })
  }

  socket.on('stopShare',stopShare);
  socket.on('chatMessage',emitMessage);
  socket.on('screensharing',emitScreenShare);
  roomHandler(socket)
 

})





server.listen(PORT, () => console.log(`Server started on port ${PORT}`));



    