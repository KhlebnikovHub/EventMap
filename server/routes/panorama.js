const router = require('express').Router();
const { Place } = require('../db/models');

router.route('/:id')
  .patch(async (req, res) => {
    const { id } = req.params;
    const filePath = req.file.path.slice(6);
    try {
      await Place.update({ panorama: filePath }, { where: { id } });
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })
  .get(async (req, res) => {
    const { id } = req.params;
    console.log('=======>', id)
    try {
      const currentPlace = await Place.findOne({ where: { id } });
      res.json(currentPlace);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })

module.exports = router;
