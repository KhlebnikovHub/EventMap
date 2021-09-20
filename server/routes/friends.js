const router = require('express').Router();
const { User, Friend, Request } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const currentUserFriends = await Friend.findAll({
        where: { user_id: id },
        include: [{ model: User }],
      });
      return res.json(currentUserFriends);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const respondentId = req.body;
    try {
      const request = await Request.create({
        applicant_id: id,
        respondent_id: respondentId.id,
      });
      return res.json(request);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })

module.exports = router;
