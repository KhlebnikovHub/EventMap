const router = require('express').Router();
const { Place, User, Event } = require('../db/models');



router.route('/allEvents')
  .get(async (req, res) => {
    try {
      const allEvents = await Event.findAll();
      return res.json(allEvents);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })

  

router.route('/newEvent')

  .post(async (req, res) => {
    console.log('REQBO', req.body);
    console.log('PATHHHH', req?.file?.path);
    const { name, description, event_date, user_id, newCoords } = req.body;
    const [latitude, longitude] = newCoords;
    try {
      const newPlace = await Place.create({ latitude, longitude, user_id });
      const newEvent = await Event.create({ name, description, event_date, user_id, place_id: newPlace.id })
      return res.json(newEvent);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }

  })

router.route('/newEvent/:id')
  .post(async (req, res) => {
    const { id } = req.params;
    const filePath = req?.file?.path.slice(6);
    console.log(filePath);
    try {
      const updatedEvent = await Event.update({ image: filePath }, { where: { id } })
      return res.json(updatedEvent)
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }

  })


module.exports = router;
