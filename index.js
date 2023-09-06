const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('DB Connet');
    })
    .catch((error) => {
        console.log('Error');
    });


app.get('/', (req, res) => {
    res.send('Working');
})


app.use(express.json);
app.use('/api', require('./routes/CreateUser'));


const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`App is listning on port ${PORT} `);
})