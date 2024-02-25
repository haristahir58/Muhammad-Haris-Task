const dotenv = require("dotenv");
const mongoose = require('mongoose');
const express = require('express');
const app = express();

dotenv.config({path:'./config.env'});
require('./db/conn')

const User = require('./model/UserSchema')


// Middleware
app.use(express.json());


//Routes
app.use(require('./routes/UserRoutes'));



const PORT = process.env.PORT;

app.listen(4000, () => {
    console.log(`Server is running at Port No ${PORT}`);
  });
  