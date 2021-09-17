const router = require('express').Router();
const { User, Event } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const oneUSer = await User.findOne({ where: { id }, include: [{ model: Event }] });
    res.json(oneUSer);
  })

module.exports = router;
