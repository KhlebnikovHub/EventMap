require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');

//  session
const flash = require('connect-flash');
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth')
.OAuth2Strategy;

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

const { checkUser } = require('./middlewares/checkUser.js')

const app = express();
const PORT = process.env.PORT ?? 3002;

app.use(cors({
  origin: true,
  credentials: true,
  sameSite: false,
}));

// passport 
app.use(
  session({
    name: 'sId',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: process.env.SESSIONSECRET,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: false,
      maxAge: 1e3 * 86400,
      sameSite: false,
    },
  }),
);

// app.use(flash())
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.GOOGLE_REDIRECT_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

// routes
const currentUser = require('./routes/currentUser');
const allUsersRouter = require('./routes/allUsers');
const oneUserRouter = require('./routes/oneUser');
const friendsRouter = require('./routes/friends');
const eventRouter = require('./routes/event');
const placeRouter = require('./routes/place');
const userRouter = require('./routes/user');
const driveRouter = require('./routes/googleDrive');
const randomPlaces = require('./routes/randomPlaces');
const panorama = require('./routes/panorama');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

app.use(multer({ storage: storageConfig }).single('img'));



app.use('/panorama', panorama);
app.use('/user', userRouter);
app.use('/allUsers', allUsersRouter);
app.use('/place', placeRouter);
app.use('/event', eventRouter);
app.use('/googleDrive', driveRouter);
app.use('/random', randomPlaces);
app.use(checkUser);

app.use('/profile', currentUser);
app.use('/oneUser', oneUserRouter);
app.use('/friends', friendsRouter);


app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
