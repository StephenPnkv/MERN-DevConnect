
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load model
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

//Validation
const validatePostInput = require('../../validation/posts');

// @route GET api/posts/test
// @desc Tests post route
// @access Public
router.get('/test', (req,res) => {
  res.json({msg: "Posts functionality works!"})
});

// @route GET api/posts/
// @desc Get all posts
// @access Public
router.get('/', (req,res) => {
  Post.find()
    .sort({date: -1})
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({noPosts: 'No posts have been found.'}));
});

// @route GET api/posts/:id
// @desc Get post by id
// @access Public
router.get('/:id', (req,res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err => res.status(404).json({noPostFound: 'No post with that id has been found.'}));
});

// @route DELETE api/posts/:id
// @desc Delete post by id
// @access Private
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          //Check for post ownership
          if(post.user.toString() !== req.user.id){
            return res.status(401).json({notAuthorized: 'User not authorized to delete post.'})
          }
          post.remove()
            .then(() => res.json({success: true}))
        })
        .catch(err => res.status(404).json({postNotFound: 'Post not found.'}));
    })

});

// @route POST api/posts/like/:id
// @desc like post
// @access Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({alreadyLiked: 'User already liked this post.'});
          }

          //Add user id to likes array
          post.likes.unshift({user: req.user.id});
          post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({postNotFound: 'Post not found.'}));

    });

});

// @route POST api/posts/comment/:id
// @desc Comment on post
// @access Private
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res) => {
  const {errors, isValid} = validatePostInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }
  Profile.findOne({user: req.user.id})
    .then(profile => {

      Post.findById(req.params.id)
        .then(post => {
          const newComment = {
            text: req.body.text,
            name: req.body.name,
            user: req.user.id,
            avatar: req.body.avatar,
          };
          post.comments.unshift(newComment);
          post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({postNotFound: 'Post not found.'}));
    });
});

// @route DELETE api/posts/delete_comment/:id
// @desc Delete comment from post
// @access Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {

      Post.findById(req.params.id)
        .then(post => {
          if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
          .length === 0){
            return res.status(404).json({commentNotExists: 'Comment does not exist'});
          }
          const removeIndex = post.comments
            .map(item => item.id.toString())
            .indexOf(req.params.comment_id);
          //Splice out of array
          post.comments.splice(removeIndex,1);
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({postNotFound: 'Post not found.'}));
    });
});

// @route POST api/posts/unlike/:id
// @desc unlike post
// @access Private
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req,res) => {

  Profile.findOne({user: req.user.id})
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if(post.likes.filter(like => like.user.toString() === req.user.id).length == 0){
            return res.status(400).json({notYetLiked: 'User did not yet like this post.'});
          }

          //Get remove index
          const removeIndex = post.likes
            .map(like => like.user.toString())
            .indexOf(req.user.id);

          //Splice out
          post.likes.splice(removeIndex,1);

          //Save
          post.save().then(post => res.json(post));

        })
        .catch(err => res.status(404).json({postNotFound: 'Post not found.'}));

    });

});

// @route POST api/posts/
// @desc Create post
// @access Private
router.post('/', passport.authenticate('jwt',{session: false}), (req,res) => {
  const {errors, isValid} = validatePostInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost.save().then(post => res.json(post));
});




module.exports = router;
