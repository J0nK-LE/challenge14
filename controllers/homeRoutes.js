const router = require('express').Router();
const { Comment, User, Child } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

router.get('/', async (req, res) => {
  try {
    // Get all comments and JOIN with user data
    const commentData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/comment/:id', async (req, res) => {
  console.log('comment', req.session);
  try {
    const commentData1 = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
          where: {
            id: req.session.user_id,
          },
        },
        {
          model: Child,
          include: [{ model: User, attributes: ['name', 'id'] }],
        },
      ],
    });
    const commentData2 = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name', 'id'],
          where: {
            id: { [Op.ne]: req.session.user_id },
          },
        },
        {
          model: Child,
          include: [{ model: User, attributes: ['name', 'id'] }],
        },
      ],
    });

    // console.log(commentData1, commentData2)
    let comment1, comment2;
    if (commentData1) {
      comment1 = commentData1.get({ plain: true });
    } else {
      comment1 = [];
    }
    if (commentData2) {
      comment2 = commentData2.get({ plain: true });
    } else {
      comment2 = [];
    }

    console.log(comment1, comment2);

    // const children1 = commentData1.map((child1) => child1.get({ plain: true }));
    // const children2 = commentData2.map((child2) => child2.get({ plain: true }));

    res.render('comment', {
      comment1,
      comment2,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Comment }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
