const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //REQ.BODY

//MIDDLEWARE FUNCTION
const logRequest = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
    next(); //MOVE ON TO THE NEXT PHASE
};
app.use(logRequest);

//To Initialized authentication codde
app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local', {session: false});
app.get('/', function (req, res) {
    res.send("Welcome to my page");
});


//IMPORT THE ROUTER FILE
const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');

//USE THE ROUTER
app.use('/person', localAuthMiddleware, personRoutes);
app.use('/menuitem', menuItemsRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is listening on port no 3000");
});