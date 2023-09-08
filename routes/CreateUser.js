const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "aiojernijogthytjurtyrtersdfjdhgjghfgd"


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
        let secPass = await bcrypt.hash(req.body.pass, salt);
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

            const pwtCompare = await bcrypt.compare(req.body.pass, userData.pass);

            if (!pwtCompare) {
                return res.status(400).json({ errors: "Please Enter Valid Details" })
            }

            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data , jwtSecret)

            return res.json({ success: true , authToken:authToken});

        } catch (error) {
            console.log(error);
            res.json({ success: false });
        }
    })



module.exports = router;