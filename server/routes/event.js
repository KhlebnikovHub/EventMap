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
    console.log('REQBOOOOOOOOOOOOOOOOOOOOOOOOOOO', req.body);

    console.log('PATHHHH', req.file);
    const filePath = req?.file?.path.slice(6)
    const { name, description, event_date, user_id, newCoords, place_name, private } = req.body;

    console.log("REQQQBODYYYY", req.body);  
    try {

      if(newCoords) {
        const [latitude, longitude] = newCoords.split(',');
        const newPlace = await Place.create({ name: place_name, latitude, longitude, user_id, });
        const newEvent = await Event.create({ name, description, event_date, user_id, place_id: newPlace.id, private: (private ? Boolean(private) : false), image: filePath ? filePath : null})
        return res.json(newEvent);
      }

    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }

  })

router.route('/newEvent/:id')
  .post(async (req, res) => {
    const { id } = req.params;
    const filePath = req?.file?.path.slice(6);
    console.log('KARTINKA', filePath);
    try {
      const updatedEvent = await Event.update({ image: filePath }, { where: { id } })
      return res.json(updatedEvent)
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }

  })



router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id }, include: [{ model: Place}, { model: User }  ]});
    // console.log('>>>>>>><<<<<<<<<<<<<<<<<<<<', user_id);
    
    res.json(event);
  });

router.route('/edit/:id')
  .patch(async (req, res) => {
    const { id } = req.params;
    const { newFormData } = req.body;
    const event = await Event.update({ name: newFormData.name,  description: newFormData.description, image: newFormData.image,}, { where: { id } });

    res.json(event);
  })

module.exports = router;
