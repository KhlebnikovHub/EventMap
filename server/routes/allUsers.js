const router = require('express').Router();
const { User } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    const allUsers = await User.findAll();
    res.json(allUsers);
  })

module.exports = router;
