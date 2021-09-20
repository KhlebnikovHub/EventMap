require('dotenv').config();

const { User } = require('../db/models');

const initUser = async (req, res, next) => {


  if (req.session?.passport?.user) {
    const email = req.session?.passport?.user?.emails[0]?.value;
    const firstName = req.session?.passport?.user?.name?.givenName;
    const lastName = req.session?.passport?.user?.name?.familyName;
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

  }
  return next();

}





module.exports = { initUser };
