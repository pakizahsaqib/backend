const { index } = require("../controllers/indexController"); // Destructuring and recieving index
var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", index);

module.exports = router;
