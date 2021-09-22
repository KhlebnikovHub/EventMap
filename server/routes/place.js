const router = require('express').Router();
const { Place, User, Event } = require('../db/models');



router.route('/allPlaces/:user_id/')
  .get(async (req, res) => {
    try {
      const { user_id } = req.params;
      if(user_id) {
        const allPlaces = await Place.findAll({ where: { user_id }, include: { model: Event } });
        return res.json(allPlaces);
      } else return res.json([{}])
      
      
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })

  



module.exports = router;
