const express = require('express');
const router = express.Router();
const menuItems = require('../models/menuItems');


//POST ROUTE TO ADD MENU ITEM
router.post('/', async (req, res) => {

    try {
        const data = req.body;

        const newMenuItem = new menuItems(data);

        const response = await newMenuItem.save();
        console.log('data saved');
        res.status(200).json(response);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//GET METHOD TO FETCH DATA
router.get('/', async (req, res) => {

    try {
        const data = await menuItems.find();
        console.log("data fetched");
        res.status(200).json(data);


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



module.exports = router; 