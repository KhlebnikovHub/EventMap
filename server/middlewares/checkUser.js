require('dotenv').config();

const { User } = require('../db/models');

const checkUser = async (req, res, next) => {


  console.log('REEEEEEEEEEEEEEEEEEEEEEQ', req.session?.passport);
  if (req.session?.passport?.user) {

    const email = req.session?.passport?.user?.emails[0]?.value;
    const firstName = req.session?.passport?.user?.name?.givenName;
    const lastName = req.session?.passport?.user?.name?.familyName;
    // const authorization = 'false';

    const ourUser = await User.findOne({ where: { email: req.session?.passport?.user?.emails[0]?.value } });
    console.log('HEEEEEEEEEEEEEEEEERE', ourUser);

    if (ourUser) {
      req.session.passport.user.local_id = ourUser.id;
      return next();
    }
    else {
      const newUser = await User.create({
        type: 'guest', email, firstName, lastName, phoneNumb: 'Отсутствует',
      });
      req.session.passport.user.local_id = newUser.id;
    }
    return next();
  } else {
    return res.redirect('/user/signIn');
  }
};

module.exports = {
  checkUser,
};
