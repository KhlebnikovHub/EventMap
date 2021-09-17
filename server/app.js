require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const morgan = require('morgan');

const app = express()

const PORT = process.env.PORT;

//routes
const currentUser = require('./routes/currentUser');

app.use(cors());
app.use(morgan());
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

app.use(multer({ storage: storageConfig }).single('avatar'));


app.use('/profile', currentUser);

app.listen(PORT, () => console.log(`Server has been started on port: ${PORT}`));
