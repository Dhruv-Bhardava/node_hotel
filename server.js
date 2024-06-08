const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/', function (req, res) {
    res.send("Welcome to my page");
});


//IMPORT THE ROUTER FILE
const personRoutes = require('./routes/personRoutes');
const menuItemsRoutes = require('./routes/menuItemsRoutes');

//USE THE ROUTER
app.use('/person',personRoutes);
app.use('/menuitem',menuItemsRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("server is listening on port no 3000");
});