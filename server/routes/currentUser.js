const router = require('express').Router();
const { User } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const currentUser = await User.findOne({ where: { id: Number(id) } });
      res.json(currentUser);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })
  .patch( async(req, res) => {
    const { id } = req.params;
    console.log('PATHHHH', req.file.path);
    const filePath = req.file.path.slice(6);
    console.log('======>', req.file);
    try {
      await User.update({ avatar: filePath }, { where: { id: Number(id) } });
      const newProfile = await User.findOne({ where: { id } });
      res.json(newProfile);
    } catch (error) {
      console.log(error);
      res.sendStatus(400);
    }
  })


module.exports = router;
