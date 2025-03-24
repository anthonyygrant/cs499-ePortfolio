// routes/index.js

var express = require("express");
var router = express.Router();

/* GET home page. */
const ctrlMain = require("../controllers/main");
const usersRoutes = require('./users'); // Include users routes

router.get("/", ctrlMain.index);
router.use('/users', usersRoutes); // Mount users routes at /users

module.exports = router;