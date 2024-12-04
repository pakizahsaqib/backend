//const userController = require("../controllers/userController.js");
const {
  create,
  getAll,
  update,
  remove,
  getOne,
} = require("../controllers/userController.js");

const {
  createUser,
  getUser,
  updateUser,
  removeUser,
} = require("../validations/userValidator.js");

var express = require("express");
var router = express.Router();

/* GET users listing. */
router.post("/create", createUser, create); //createUser act as a middleware it perform validation and then, create req/function is carried out
router.get("/get-all", getAll);
router.get("/get", getUser, getOne);
router.put("/update", updateUser, update);
router.delete("/remove", removeUser, remove); //delete keyword cannot be used - reserved keyword

module.exports = router;
