// routes/index.js

var express = require("express");
var router = express.Router();

/* GET home page. */
const ctrlMain = require("../controllers/main");
const usersRoutes = require('./users'); 

router.get("/", ctrlMain.index);
router.use('/users', usersRoutes); 

module.exports = router;