const router = require('express').Router();
const { User } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const currentUser = await User.findOne({ where: { id: Number(id) } });
    res.json(currentUser);
  })
  .post((req, res) => {
    const { id } = req.params;
    
    console.log(req.body)
    console.log(req.file);
  })


module.exports = router;
