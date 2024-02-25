const express = require('express');
const User = require('../model/UserSchema')
const router = express.Router();
require('../db/conn');

// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9]+@(yahoo|gmail|hotmail)\.(com|net|org)$/i;

//Adding the User 
router.post('/user/new', async (req,res)=>{
    const { name, email, cellNumber,age} = req.body;
    
    // Field should not be empty 
    if (!name|| !email || !cellNumber || !age ){
        return res.status(422).json({error: "Field is empty! Please fill it"});
    }
    // Email Pattern should be followed
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email address" });
    }
    // Cell number should not have negative value
    if (cellNumber < 0 ) {
        return res.status(422).json({ message: 'Cell Number must be non-negative values' });
    }
    // Age should be in between 18 and 60
    if (age < 18 || age > 60){
    return res.status(400).json({error:'Age must be between 18 and 60'})
    }
    // Cell number length limit
    if (cellNumber.length < 9 || cellNumber.length > 13) {
        return res.status(400).json({ error: 'Cell number length must be between 9 and 13' });
    }
    // Cell number should contain only numbers
    if (!/^\d+$/.test(cellNumber)) {
    return res.status(400).json({ error: 'Cell number should contain only numbers' });
    }

    try {
     // Check if user already exists   
    const userExist = await User.findOne({email: email})
    if(userExist){
        return res.status(422).json({error: "User already Exists" });
    }
    else{
        const user = new User({name, email, cellNumber, age});
        // Saving user collection in DB
          await user.save();
          res.status(201).json({ message: 'User added successfully' });
      } 
    }

  catch (err) {
      console.error(err); 
    res.status(400).json({ message: err.message });
  }
});


//For Getting the all products data we will use router.get
router.get('/users',async(req,res)=>{
    try {
        const { search } = req.query;
        let users;
        if (search) {
          users = await User.find({ name: { $regex: search, $options: 'i' } });
        } else {
          users = await User.find();
        }
        res.json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
  

module.exports = router;