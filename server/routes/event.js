const router = require('express').Router();
const { Place, User, Event, Image } = require('../db/models');
const axios = require('axios');


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
    const filePath = req?.file?.path.slice(6)
    const { name, description, event_date, user_id, newCoords, place_name, private } = req.body;

    try {

      if (newCoords) {
        const [latitude, longitude] = newCoords.split(',');
        const thisPlace = await Place.findOne({ where: { latitude: latitude, longitude: longitude } })
        if (thisPlace?.longitude == longitude && thisPlace?.latitude == latitude) {
          const newEvent = await Event.create({ name, description, event_date, user_id, place_id: thisPlace?.id, private: (private ? Boolean(private) : false), image: filePath ? filePath : null })
          const newEventPlace = await Place.findOne({ where: { id: thisPlace?.id }, include: { model: Event } })
          return res.json(newEventPlace);
        } else {
          const newPlace = await Place.create({ name: place_name, latitude, longitude, user_id, });
          const newEvent = await Event.create({ name, description, event_date, user_id, place_id: newPlace.id, private: (private ? Boolean(private) : false), image: filePath ? filePath : null })
          const newEventPlace = await Place.findOne({ where: { id: newPlace?.id }, include: { model: Event } })
          return res.json(newEventPlace);
        }
      }

    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }

  })

// router.route('/newEvent/:id')
//   .post(async (req, res) => {
//     const { id } = req.params;
//     const filePath = req?.file?.path.slice(6);
//     try {
//       const updatedEvent = await Event.update({ image: filePath }, { where: { id } })
//       return res.json(updatedEvent)
//     } catch (error) {
//       console.log(error);
//       return res.sendStatus(500).end();
//     }

//   })



router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const event = await Event.findOne({ where: { id }, include: [{ model: Place }, { model: User }, { model: Image }] });
    res.json(event);
  });

router.route('/edit/:id')
  .patch(async (req, res) => {
    const { id } = req.params;
    const { newFormData } = req.body;
    try {
      const event = await Event.update({ name: newFormData.name, description: newFormData.description, image: newFormData.image, }, { where: { id } });
      const editedEvent = await Event.findOne({ where: { id }, include: [{ model: Place }, { model: User }, { model: Image }]  }) 
      return res.json(editedEvent);
    } catch (error) {
      return res.sendStatus(500).end();
    }

  })

router.route('/profileEvents/:id')
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const profileEvents = await Event.findAll({ where: { user_id: id }, include: [{ model: Place }, { model: User }] });
      res.json(profileEvents);
    } catch (error) {
      return res.sendStatus(500).end();
    }
  });

router.route('/addPhotoEvent/:id')
  .post(async (req, res) => {
    const { id } = req.params;
    const { googleDisc, otherPhoto } = req.body

    try {
      if (googleDisc) {
        if (googleDisc.folder !== '') {
          const regularFolder = googleDisc?.folder?.match(/rs\/([\w]{0,})/gmi);
          const folderId = regularFolder?.map(el => el.slice(3, el.length))
          const resp = await axios.get(`https://drive.google.com/embeddedfolderview?id=${folderId}#grid`)
          var imagePath = []
          const site = resp.data;
          const regularId = site.match(/d\/([\w]{0,})/gmi);
          const imageId = regularId.map(el => el.slice(2, el.length))
          const imageArrPath = imageId.map(el => `https://drive.google.com/uc?export=view&id=${el}`)
          for (let item of imageArrPath) {
            imagePath.push(item)
            await Image.create({ path: item, event_id: id })
          }
        } else {
          const regularId = googleDisc?.photo?.match(/d\/([\w]{0,})/gmi);
          const imageId = regularId.map(el => el.slice(2, el.length))
          const imagePath = imageId.map(el => `https://drive.google.com/uc?export=view&id=${el}`)
          for (let item of imagePath) {
            await Image.create({ path: item, event_id: id })
          }
          // return res.json(imagePath)
          // await Image.create({path: googleDisc.photo, event_id: id})
        }
        const allEventPhoto = await Image.findAll({ where: { event_id: id } })
        return res.json(allEventPhoto)
      }
      await Image.create({ path: otherPhoto.otherPhoto, event_id: id })

      const allEventPhoto = await Image.findAll({ where: { event_id: id } })
      return res.json(allEventPhoto)

    } catch (error) {
      return res.sendStatus(500).end();
    }
  });

module.exports = router;
