const router = require('express').Router();
const { Place, User, Event } = require('../db/models');



router.route('/allPlaces/:user_id/')
  .get(async (req, res) => {
    try {
      const { user_id } = req.params;
      console.log(">>>>>>>>>>>>>>> USER_ID", user_id)
      if(user_id) {
        const allPlaces = await Place.findAll({ where: { user_id }, include: { model: Event } });
        console.log("ALLL PLACES", allPlaces);  
        return res.json(allPlaces);
      } else return res.json([{}])
      
      
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })

  



module.exports = router;
