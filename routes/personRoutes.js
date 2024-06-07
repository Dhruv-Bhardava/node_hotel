const express = require('express');
const router = express.Router();
const person = require('../models/Person');


//POST ROUTE TO ADD A PERSON
router.post('/', async (req, res) => {

    try {
        const data = req.body; //Assuming the request body contain the person data

        //Create a new person documert using the mongoose model
        const newPerson = new person(data);

        //Save the new person to the database
        const response = await newPerson.save();
        console.log('data saved');
        res.status(200).json(response);

    } catch (error) {
        console.log(err);
        res.json({ error: 'Internal server Error' });
    }


});

//GET METHOD TO FETCH THE DATA

router.get('/', async (req, res) => {

    try {
        const data = await person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server Error' });
    }

});


router.get('/:workType', async (req, res) => {

    try {
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response = await person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server Error' });
    }
});

router.put('/:id', async (req, res) => {

    try {

        const personId = req.params.id; //EXTRACT THE ID FROM THE URL PARAMETER
        const updatedPersonData = req.body; //UPDATED DATA FOR THE PERSON

        const response = await person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, //Return the updated document
            runValidators: true //R/un Mongoose Validation
        });

        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }

        console.log("Data updated");
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server Error' });
    }
});

router.delete('/:id', async (req, res) => {

    try {

        const personId = req.params.id; //EXTRACT THE ID FROM THE URL PARAMETER

        const response = await person.findByIdAndRemove(personId);

        if (!response) {
            return res.status(404).json({ error: 'person not found' });
        }

        console.log("Data updated");
        res.status(200).json({meassge : 'erson deleted success'});

    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server Error' });
    }
});



module.exports = router;