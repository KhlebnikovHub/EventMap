const router = require('express').Router();
const { User } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const currentUser = await User.findOne({ where: { id: Number(id) } });
    res.json(currentUser);
  })
  .patch( async(req, res) => {
    const { id } = req.params;
    const filePath = req.file.path.slice(6);
    await User.update({ avatar: filePath }, { where: { id: Number(id) } });
    const newProfile = await User.findOne({ where: { id } });
    console.log( '=========', newProfile)
    res.json(newProfile);
  })


module.exports = router;
