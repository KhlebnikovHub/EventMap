const router = require('express').Router();
const { User, Friend, Request } = require('../db/models');

router.route('/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
      const currentUserFriends = await Friend.findAll({
        where: { user_id: id },
        include: [{ model: User }],
      });
      let newFriends = [];
      for(let friend of currentUserFriends) {
        newFriends.push(friend?.User);
      }

      return res.json(newFriends);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const respondentId = req.body;
    console.log(respondentId, id);
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
  });

router.route('/requests/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const allUserRequest = await Request.findAll({ where: { respondent_id: id },
      include: [{ model: User }],
    });
    let allRequest = [];
    let i = 0;
    for (let request of allUserRequest) {
      const oneUser = await User.findOne({where: { id: request.applicant_id}})
      allRequest[i] = oneUser;
      i++;
    }
    res.json(allRequest);
  })
  .delete(async (req, res) => {
    // console.log("req.params", req.params, '--------', '   req.body', req.body);
    const { id } = req.params;
    const applicantId = req.body;
    await Request.destroy({ where: { applicant_id: applicantId.id, respondent_id: id } });
    res.json({ 123: 2 });
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const applicantId = req.body;
    // console.log('req.params', req.params, '--------', '   req.body', req.body);

    await Friend.create({
      user_id: applicantId.id,
      friend_id: id,
    },
    { returning: true, plain: true });
    await Friend.create({
      friend_id: applicantId.id,
      user_id: id,
    },
    { returning: true, plain: true });
    const newFriend = await User.findOne({ where: { id: applicantId.id } })
    res.json(newFriend);
  })

module.exports = router;
