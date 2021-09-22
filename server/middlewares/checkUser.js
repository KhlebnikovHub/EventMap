require('dotenv').config();

const { User } = require('../db/models');

const checkUser = async (req, res, next) => {


  console.log("KAWKA zbs");
  if (req.session?.passport?.user) {
    // console.log(req.session?.passport?.user);
    const email = req.session?.passport?.user?.emails[0]?.value;
    const firstName = req.session?.passport?.user?.name?.givenName;
    const lastName = req.session?.passport?.user?.name?.familyName;
    // const authorization = 'false';

    const ourUser = await User.findOne({ where: { email: req.session?.passport?.user?.emails[0]?.value } });

    if (ourUser) {
      req.session.passport.user.emails[0].value = ourUser.email;
      return next();
    }
    else {
      console.log("POSOSESH OK");
    }
    // return next();
  } else {
    // return res.redirect('/user/signIn');
    console.log("PISYAKAKA");
  }
};

module.exports = {
  checkUser,
};
