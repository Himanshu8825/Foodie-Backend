const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })
    .then(() => {
        console.log('DB Connet');
        const fetched_data = mongoose.connection.db.collection('food_items');
        fetched_data.find({}).toArray((err, data) => {

            const foodCategory = mongoose.connection.db.collection('foodCategory');
            foodCategory.find({}).toArray((err, catData) => {
                if (err) console.log(err);
                else {
                    global.food_items = data;
                    global.foodCategory = catData;
                    // console.log(global.food_items)
                }
            })
            // if (err) console.log(err);
            // else {
            //     global.food_items = data
            //     // console.log(global.food_items)
            // }
        })
    })
    .catch((error) => {
        // console.log('Error');
        console.error(error.message);
    });


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


const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
    console.log(`App is listning on port ${PORT} `);
})