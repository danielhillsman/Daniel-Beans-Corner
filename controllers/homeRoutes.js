const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        // get all posts and join with user data
        const postData = await Post.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["name"]
                }
            ]
        })
        // serialize data so template can read it
        const posts = postData.map((posts) => posts.get({ plain: true}));
    
        res.render('homepage', { 
            posts,
            logged_in : req.session.logged_in
        });
        // res.json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

// get a post by its id 
router.get('/posts/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)
        
        // serialize data so template can read it
        const post = postData.get({ plain: true});

        res.render('singlepostpage', { 
            post, 
            logged_in : req.session.logged_in
        });
        // res.json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

// search a post by the term
router.get('/search/:term', async (req, res) => {
    try {
        // be able to find a post based on the term 
        const postData = await Post.findAll({
            where: {
              [Op.or]: [
               {make_name: { [Op.like]: '%' + req.params.term + '%' }},
               {post_model: { [Op.like]: '%' + req.params.term + '%' }}
              ]
            }
          });
        
        // serialize data so template can read it
        const posts = postData.map((posts) => posts.get({ plain: true}));

        res.render('postpage', { 
            posts, 
            logged_in : req.session.logged_in
        });
        // res.json(posts)
    } catch (err) {
        res.status(500).json(err)
    }
})

// route to get the form to post a new post, use withAuth to prevent access to route
router.get('/new/post', withAuth, async (req, res) => {
    try {
        res.render('newpostformpage', { 
            logged_in : req.session.logged_in
        });
        // res.json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

// route to login
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.render('/');
        return;
    }

    res.render('login');
});

module.exports = router;