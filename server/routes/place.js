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


  router.route('/deleteEvent/:id/')
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const currentEvent = await Event.findOne({ where: { id } })
      const allEventPlace = await Event.findAll({ where : { place_id: currentEvent?.place_id } })
      if (allEventPlace.length > 1) {
        const deletedEvent = await Event.findOne({ where: { id }, include: { model: Place } });
        await Event.destroy({ where: { id } });
        return res.json(deletedEvent);
      } else if (allEventPlace.length === 1) {
        const deletedEvent = await Event.findOne({ where: { id }, include: { model: Place } });
        await Place.destroy({ where: { id: currentEvent?.place_id }})
        await Event.destroy({ where: { id } });
        return res.json(deletedEvent)
      }
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })


module.exports = router;
