const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URL;

const MongoDB = async () => {
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const db = mongoose.connection;

        const fetched_data = await db.collection('food_items').find({}).toArray();
        const foodCategory = await db.collection('foodCategory').find({}).toArray();

        global.food_items = fetched_data;
        global.foodCategory = foodCategory;

        // console.log(global.food_items);
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = MongoDB;
