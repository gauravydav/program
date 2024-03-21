const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const userRoutes=require('./routes/userRoutes')
const mongoose = require('mongoose');
const cors=require('cors')
//Middleware
app.use(express.json());
app.use(cors());
//MongoDb connection
mongoose.connect('mongodb+srv://gaurav:gaurav@cluster0.olettvy.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDb Connection error'))
db.once('connected', () => {
    console.log('MongoDB connected successfully');
  });
  
  // Event listener for connection close
  db.once('disconnected', () => {
    console.log('MongoDB disconnected');
  });

app.use(bodyParser.json());

//Define Mongoose Schema


// Routes
app.use('/', userRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});