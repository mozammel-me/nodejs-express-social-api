let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

let Profile = require('../../model/Profile');
let User = require('../../model/User');


// endpoint: /api/profile/
// method: GET
// show user profile

router.get('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    const error = {};
    Profile.findOne({user_id: req.user.id})
    .then((profile) => {
        if(!profile) {
            error.noprofile = "there is no profile on this id";
            return res.status('404').send(error);
        }
        res.send(profile)
    })
    .catch(err => {return res.status(400).send(err)});
});


// endpoint: /api/profile/
// method: post
// create user profile, while exist update user profile

router.post('/', passport.authenticate('jwt', { session: false }), (req,res) => {
    const error = {};
    let user_id = req.user.id;
    let {handle, company, website, location, status, skills, bio, github, youtube, twitter, facebook, linkedin, instagram} = req.body;
    let profileData = {handle, company, website, location, status, skills, bio, github};
    profileData.social = {youtube, twitter, facebook, linkedin, instagram};

    let profileFields = {};
    profileFields.user_id = req.user.id;
    if(handle) profileFields.handle = handle;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(status) profileFields.status = status;
    if(typeof skills !== 'undefined'){
        profileFields.skills = skills.split(',');
    } ;
    if(bio) profileFields.bio = bio;
    if(github) profileFields.github = github;

    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(twitter) profileFields.social.twitter = twitter;
    if(instagram) profileFields.social.instagram = instagram;



   Profile.findOne({user_id: req.user.id})
   .then((profile) => {
        if(profile) {
            Profile.findOneAndUpdate({user_id: req.user.id},{$set:profileFields},{new: true})
            .then((profile) => res.send(profile))
            .catch(err => {return res.status(400).send(err)})
        }else {
            Profile.findOne({handle: profileFields.handle})
            .then((profile) => {
                if(profile){
                    error.handle = 'That handle already exists';
                    return res.send(error.handle);
                }
            });
            new Profile(profileFields).save()
            .then((profile)=> {res.send(profile)})
            .catch(err => {return res.send(err)})
        };
         
   })
   .catch(err => { return res.send(err) })
});

module.exports = router;    