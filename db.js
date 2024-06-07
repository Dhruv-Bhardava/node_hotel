const mongoose = require('mongoose');

// DEFINE THE MONGO DB CONNECTION URL
const mongoURL = 'mongodb://localhost:27017/hotel';

// SET UP THE MONGO DB CONNECTION
mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

// GET THE DEFAULT CONNECTION
const db = mongoose.connection;

// DEFINE THE EVENT LISTENERS FOR DATABASE CONNECTION
db.on('connected', () => {
    console.log("mongodb connected");
});

db.on('disconnected', () => {
    console.log("mongodb disconnected");
});

db.on('error', (err) => {
    console.log("mongodb connection error:", err);
});

// EXPORT THE DB CONNECTION
module.exports = db;



