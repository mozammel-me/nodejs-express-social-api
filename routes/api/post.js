let express = require('express');
let router = express.Router();
let Joi = require('joi');
let Post = require('../../model/Post');
let passport = require('passport');
let postValidation = require('../../validation/postValidation');


// endpoint: /api/post
// method: GET
// show all post

router.get('/', (req, res) => {
    Post.find().then((posts)=> { res.json(posts) })
});


// endpoint: /api/post
// method: POST
// create a new post

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let {title, details} = req.body;
    Joi.validate(req.body, postValidation)
    .then((result) => {
        let this_user = {};
        this_user.user_id = req.user._id;
        this_user.user_name = req.user.name;
        let like = {};
        like.user_id = req.user._id;
        like.user_name = req.user.name;
       let post = new Post({
           title, details, user: this_user
       });
       post.save();
       res.send(post);
    })
    .catch((err) => { return res.send(err.details[0].message) });

});

// endpoint: /api/post/like/id
// method: POST
// like or remove like to a post

router.post('/like/:id', passport.authenticate('jwt', { session: false }),  (req, res) => {
   
    getUser = async function () {
        let post = await Post.findById(req.params.id);
        let exist =  post.like.filter((value) => value.user_id == req.user._id);
        let likeOf = {
            user_id: req.user._id,
            user_name: req.user.name
        }
        
        if(exist.length > 0){
          let index =  post.like.map((value) => { value.user_id}).indexOf(req.user._id);
          post.like.splice(index, 1);
          post.save();
            res.send(post);
        }else {
            post.like.push(likeOf);
            post.save();
            res.send(post);
        }
    }
    getUser();
    
});

// endpoint: /api/post/comments/id
// method: POST
// comments to a post

router.post('/comments/:post_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    
    let post_id = req.params.post_id;
    Post.findById(post_id)
    .then((docs) => {
        let comments = {};
        comments.text= req.body.text;
        comments.user_id= req.user._id;
        comments.user_name= req.user.name;
        docs.comments.push(comments);
        docs.save();
        res.send(docs);
    })   
});

// endpoint: /api/post/id
// method: GET
// show a single post

router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
    .then((post) => {
        res.send(post)
    })
    .catch(err => res.send('post not fount'))
}); 


// endpoint: /api/post/id
// method: DELETE
// delete a post

router.delete('/:id', (req, res) => {
    Post.findByIdAndDelete(req.params.id)
    .then((post) => {
        res.send(post)
    })
    .catch(err => res.send('post not fount'))
}); 

module.exports = router;