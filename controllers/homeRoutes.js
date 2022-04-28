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
        const postData = await Post.findOne({where:{id:req.params.id}, include: User})
        console.log(postData.get({plain: true}));
    

        // serialize data so template can read it
        const post = postData.get({ plain: true});

        const userPostData = await User.findOne({
            where:{id:post.user.id}, include: [Post]
        })
       const userInfo = userPostData.get({plain: true})
       console.log(userPostData.get({plain: true}))
       
        res.render('posts', { 
            post,
            userInfo, 
            logged_in : req.session.logged_in
        });
        // res.json(post)
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

// Profile page for user logged in
router.get('/profile', withAuth, async (req, res) => {
    try {
      // Find the logged in user based on the session ID
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Post }],
      });
  
      const user = userData.get({ plain: true });
  
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });




module.exports = router;