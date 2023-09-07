const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');

router.post('/creatuser',
    [body('email').isEmail(),
    body('pass').isLength({ min: 5 }),
    body('name').isLength({ min: 5 })],
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.pass , salt);
        try {
            await User.create({
                name: req.body.name,
                email: req.body.email,
                pass: secPass,
                location: req.body.location
            })
                .then(res.json({ success: true }));

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })


router.post('/loginuser',
    [body('email').isEmail(),
    body('pass').isLength({ min: 5 })],

    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });

            if (!userData) {
                return res.status(400).json({ errors: "Please Enter Valid Details" })
            }

            if (req.body.pass !== userData.pass) {
                return res.status(400).json({ errors: "Please Enter Valid Details" })
            }

            return res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })



module.exports = router;