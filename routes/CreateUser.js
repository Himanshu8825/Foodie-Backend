const express = require('express');
const router = express.Router();
const user = require('../models/User');


router.post('/createuser', async (req, res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            pass: req.body.pass,
            location: req.body.location
        })
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
})

module.exports = router;