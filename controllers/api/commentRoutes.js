const router = require('express').Router();
const { Comment, Child } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
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
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:id', withAuth, async (req, res) => {
  console.log(req.body,"Update comment",req.params.id)
  try {
    const commentData = await Comment.update(req.body,{
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      }
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.post('/:id/child', withAuth, async (req, res) => {
 
  try {
    const newChild = await Child.create({
      ...req.body,
      user_id: req.session.user_id,
      user_name: req.session.user_name
    });

  

    res.status(200).json(newChild);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
