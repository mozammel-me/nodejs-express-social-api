let express = require('express');
let router = express.Router();
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let passport = require('passport');
let gravatar = require('gravatar');
let User = require('../../model/User');
let key = require('../../config/key');
let Joi = require('joi');
let registerValidation = require('../../validation/registerValidation')


// endpoint: /api/user/register
// method: POST
// user registration

router.post('/register', (req, res) => {
    let {name, email, password} = req.body;

    let result = Joi.validate(req.body, registerValidation);
    if(result.error){ return res.send(result.error.details[0].message) }
    
    User.findOne({email})
    .then(user => {
        if(user){
            return res.status(400).send('email already exist');
        } else{
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(password, salt, function(err, hash) {
                    let hashPassoword = hash;
                    let avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
                    const newUser = new User({
                        name, email, password: hashPassoword, avatar
                    });
                    newUser.save()
                    .then(user => {res.json(user)})
                    .catch(err => {return res.send(err)})
                });
            });
            
        }
    }).catch(err => { return res.send(err)})
});

// endpoint: /api/user/login
// method: POST
// user login

router.post('/login', (req,res) => {
    let { email, password } = req.body;
    User.findOne({email})
    .then((user) => {
        bcrypt.compare(password, user.password, function(err, result) {
            if(err) { return res.send('password not match')}
            let user2 ={
                id: user._id,
                name: user.name,
                email: user.email
            }
            const token = jwt.sign(user2, key.secrectKey);
           return res.json({user2, token: 'Bearer '+ token });
        });
    }).catch((err)=> { return res.send('email not match')});
    
});

router.get('/profile', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.send(req.user);
    }
);





module.exports = router;