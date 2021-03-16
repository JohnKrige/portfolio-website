const express = require('express');
const multer = require('multer');
const { validationResult } = require('express-validator');
const bodyParser = require('body-parser');
require('dotenv').config();

const { nameVerification, emailVerification, messageVerification } = require('./validators');
const sendEmail = require('./email');

const app = express();
const upload = multer();

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/', upload.none(),
[ nameVerification, emailVerification, messageVerification ],
async (req, res) => {
    const { message, from, email } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.errors);
    } else {
        const emailSent = await sendEmail(email, from, 'receive', message);
        const replyEmail = sendEmail(email, from, 'send');
        if (emailSent === 'success') {
          console.log('Success');
            res.status(200).json('success');
        } else {
          console.log('fail');
            res.status(404).json('fail');
        }
    }
});

let port = process.env.PORT;

if (port == null || port === '') {
  port = 3000;
}
app.listen(port, () => {
  console.log('And we are live');
});
