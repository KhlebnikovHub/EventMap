const router = require('express').Router();
const { User, Event, Place } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const oneUSer = await User.findOne({ 
      where: { id },
      include: [{ model: Event }, { model: Place }]
    });
    res.json(oneUSer);
  })

module.exports = router;
