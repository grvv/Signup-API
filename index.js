const express = require('express');
const app = express();

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

const bodyParser = require('body-parser');

const validator = require('validator');
const dbForum = require('./models/forms');

// Adding bodyParser's middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Connecting Mongoose
mongoose.connect('mongodb://localhost/test', err => {
    if (err) {
        console.log(err);
    } else {
        console.log('database connected')
    }
});

const middle = (req, res, next) => {
    if (!req.body.firstName || !req.body.email || !req.body.password) {
        res.json({
            sucess: false,
            msg: 'incomplete data'
        });
    } else {
        next();
    }
}

const emailValid = (req, res, next) => {
    if (!validator.isEmail(req.body.email)) {
        res.json({
            sucess: false,
            msg: 'Invalid email'
        });
    } else if (!validator.isInt(req.body.age, { min: 10, max: 120 })) {
        res.json({
            sucess: false,
            msg: 'Invalid Age'
        });
    } else if (!validator.isAlpha(req.body.firstName)) {
        res.json({
            sucess: false,
            msg: 'Invalid Name'
        });
    }
    else {
        next();
    }
}

app.post('/form', middle, emailValid, (req, res) => {

    dbForum.findOne({ email: req.body.email }, (err, data) => {
        if (err) {
            res.json({
                success: false,
                msg: "hsdvjkfo"
            })
        }
        else if (data) {
            res.json({
                success: false,
                msg: "Email already used"
            })
        }
        else {
            var newForm = new dbForum({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                age: req.body.age,
                email: req.body.email,
                password: req.body.password
            })

            newForm.save((err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        success: true,
                        message: 'Data Saved Successfully',
                        data: data
                    })
                }
            })
        }
    })
})

app.post('/login', (req, res) => {
    dbForum.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            if (data.password == req.body.password) {
                let obj = {
                    email: data.email,
                    age: data.age,
                    name: data.firstName

                }
                let token = jwt.sign(obj, 'D3V3L0PEMN3T');
                res.json({
                    success: true,
                    msg: 'Login Successfull',
                    token: token
                })
            } else {
                res.json({
                    success: false,
                    msg: 'Invalid Password'
                })
            }
        } else if (err) {
            res.json({
                success: true,
                msg: err
            })
        } else {
            res.json({
                success: false,
                msg: 'invalid credentails'
            })
        }
    })
})

app.get('/dashboard', (req, res) => {
    console.log('fduggkug')
    jwt.verify(req.headers.xx, 'D3V3L0PEMN3T', (err, decoded) => {
        if (err) {
            res.json({
                success: false,
                mdg : 'invalid token'
            })
        } else {
            res.json({
                success: true,
                decodedValue: decoded
            })
        }
    });

})

// Server
app.listen(4000, () => console.log('Server is running on port 4000'));