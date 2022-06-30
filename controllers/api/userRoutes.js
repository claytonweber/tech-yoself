const router = require('express').Router();
const {  User } = require('../../models');

// const withAuth = require('../../utils/auth');

// api/user
//possibly use withAuth here?
router.post('/', async (req, res) => {
  try {
    const userData = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      email: req.body.email,
      password: req.body.password,
    });
    req.session.save(() => {
      req.sesssion.user_id = userData.id;
      req.session.logged_in = true;
      console.log(userData, userData.id)

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// api/user/login
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email }});

    if(!userData) {
      res
        .status(400)
        .json({message: 'Wrong username or password, try again'});
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if(!validPassword) {
      res 
        .status(400)
        .json({ message: 'Wrong username or password, try again'});
      return;
    }

    req.session((save) => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are logged in!' });
    });    
  } catch(err) {
      res.status(400).json(err);
  }
});

// api/user/logout
router.post('/logout', (req, res) => {
  if(req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
      res.status(404).end();
  }
});

module.exports = router;