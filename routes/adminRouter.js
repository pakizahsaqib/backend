const { create, get } = require("../controllers/adminController");

const router = require("express").Router();
//shortForm of this
//var express = require("express");
// var router = express.Router();
router.post("/create", create);
router.get("/get-admin", get);

module.exports = router;
