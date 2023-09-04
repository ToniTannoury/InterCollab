const express = require('express');
const dotenv = require('dotenv').config();
const userRoutes = require('./routes/userRoutes'); 
const PORT = process.env.PORT || 8000;
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require("./config/db");
const app = express();
const colors = require('colors'); 
const cors = require('cors');

// Connect to database
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


 
app.get('/', (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use('/api/users', userRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => console.log(`Server started on port ${PORT}`));



    