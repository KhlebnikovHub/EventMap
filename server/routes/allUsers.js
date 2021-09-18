const router = require('express').Router();
const { User, Request, Friend } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const allUsers = await User.findAll({
      include: [{ model: Request }, { model: Friend }],
    });
    res.json(allUsers);
  })

module.exports = router;