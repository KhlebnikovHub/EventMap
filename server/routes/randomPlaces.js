const router = require('express').Router();
const { Place, Event } = require('../db/models');


router.route('/randomPlaces')
  .get(async (req, res) => {
    try {
      const randomPlaces = await Place.findAll({ limit: 50, include: { model: Event } });
      return res.json(randomPlaces);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  });

module.exports = router;
