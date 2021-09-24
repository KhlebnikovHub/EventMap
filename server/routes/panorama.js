const router = require('express').Router();
const { Place } = require('../db/models');

router.route('/:id')
  .patch((req, res) => {
    const { id } = req.params;
    console.log(req.files);
    console.log(id);
    try {
      
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })

module.exports = router;
