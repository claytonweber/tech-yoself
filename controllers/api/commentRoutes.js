const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//api/post/
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.findAll({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
    console.log(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'Aint no comment here' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//router.put?

module.exports = router;
