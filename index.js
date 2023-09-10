const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const MongoDB = require('./db');
MongoDB();
require('dotenv').config();





app.get('/', (req, res) => {
    res.send('Working');
})

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-requested-with , Content-Type , Accept"
    );
    next();
});


app.use(express.json());
app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));


const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`App is listning on port ${PORT} `);
})