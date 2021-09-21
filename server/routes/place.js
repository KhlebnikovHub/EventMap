const router = require('express').Router();
const { Place, User, Event } = require('../db/models');



router.route('/allPlaces/:user_id/')
  .get(async (req, res) => {
    try {
      const { user_id } = req.params;
      const allPlaces = await Place.findAll({ where: { user_id }, include: { model: Event } });
      console.log(user_id);
      
      console.log(allPlaces);
      
      return res.json(allPlaces);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })

  



module.exports = router;
