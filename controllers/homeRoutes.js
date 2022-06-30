const router = require('express').Router();
const { Post, User, Project } = require('../models');
const { post } = require('./api');

//get all, get by id, 


//get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{model: User}],
    });

    const posts = post.postData((map) => post.get({ plain:true }));

    res.render('homepage', { posts });
  } catch(err) {
    res.status(500).json(err);
  }
});
//get post by id
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      innclude : [
        {
          model: User,
          attributes: ['name'],
        }
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
      res.status(500).json(err)
  }
});

router.get('/')


//use with auth here?
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if(req.session.log_in) {
    res.redirect('/profile');
    return 
  }
  res.render('login');
})

module.exports = router;