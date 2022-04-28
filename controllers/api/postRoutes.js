const router = require('express').Router();
const { Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// route to post a new Post
router.post('/new', withAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })

        res.status(200).json(newPost);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});
// Deleting a post route by ID
  router.delete('/:id', (req, res) => {
    console.log('delete button!!!')
    // Looks for the books based book_id given in the request parameters
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedPost) => {
        res.json(deletedPost);
      })
      .catch((err) => res.json(err));
  });
  
  

module.exports = router;