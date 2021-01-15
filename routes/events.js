const multer = require('multer');
const express = require("express");
const { check_auth } = require('../middleware/middleware')
const router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname +".jpeg")
    }
  })
   
  var upload = multer({ storage: storage })
const { allEvents,addEvent } = require('../controllers/EventController');
router.get('/all-events',check_auth, allEvents);
router.post('/add-new-event', upload.single('image'), addEvent);

//users
const { Login, Register } = require('../controllers/UserController');
router.post('/Login', Login);
router.post('/signup', Register);
module.exports=router