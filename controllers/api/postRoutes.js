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
})

// updating posts route by ID
router.put('/:id', (req, res) => {
    //Calls the update method on the Book model
    Post.update(
      {
        // All the fields you can update and the data attached to the request body.
        make_name: req.body.make_name,
        transmission: req.body.transmission,
      },
      {
        // Gets a book based on the book_id given in the request parameters
        where: {
          id: req.params.post_id,
        },
      }
    )
      .then((updatedPost) => {
        res.json(updatedPost);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });



// Deleting a post route by ID
  router.delete('/:id', (req, res) => {
    // Looks for the books based book_id given in the request parameters
    Post.destroy({
      where: {
        id: req.params.post_id,
      },
    })
      .then((deletedPost) => {
        res.json(deletedPost);
      })
      .catch((err) => res.json(err));
  });
  
  

module.exports = router;