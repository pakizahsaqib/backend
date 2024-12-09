const joi = require("joi");
const responseHandler = require("../responseHandler");

//create schema
//https://joi.dev/api/?v=17.13.3

//create
const createValidation = joi.object({
  name: joi.string().min(3).max(34).required(),
  username: joi.string().alphanum().min(6).max(34).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(64).required(),
});

const getAllValidation = joi.object({
  pageNo: joi.number().min(1).default(1).required(),
  limit: joi.number().valid(10, 20, 30).default(10).required(), // valid is making sure only these given values should be considered
  order: joi.string().valid("ASC", "DESC"),
  orderBy: joi.string().valid("createdAt", "email", "username", "name"),
  name: joi.string().min(3).max(34),
  username: joi.string().alphanum().min(6).max(34),
  email: joi.string().email(),
});

const getAllUsers = async (req, res, next) => {
  try {
    await getAllValidation.validateAsync(req.query);
    next();
  } catch (error) {
    return responseHandler(res, { error: error.message });
  }
};

//req is essential to recieve data for validation
//and res to geberate response accordingly
//next to to next functionality
const createUser = async (req, res, next) => {
  try {
    console.log("beforeeeeeeee", req.body);
    await createValidation.validateAsync(req.body);
    //this kind of data is passed through, not through query params as query param exposes data in the url
    console.log("afterrrrrrrrrrr");
    //if validate move to next functionality
    next();

    // otherwise it will go to catch block
  } catch (error) {
    return res.send({
      status: 400,
      message: "Validation error",
      data: {},
      error: error.details[0].message,
    });
  }
};

const getValidation = joi.object({
  userId: joi.string().max(64).required(),
  username: joi.string().max(34).required(),
});
const getUser = async (req, res, next) => {
  try {
    await getValidation.validateAsync(req.query);
    //this kind of data is passed through, not through query params as query param exposes data in the url

    //if validate move to next functionality
    next();

    // otherwise it will go to catch block
  } catch (error) {
    return responseHandler(res, {
      error: error.message,
    });
  }
};

// Update
const updateValidation = joi.object({
  userId: joi.string().max(64).required(),
  name: joi.string().min(3).max(34).required(),
  username: joi.string().alphanum().min(6).max(34).required(), //use read-only flag
  email: joi.string().email().required(),
});

const updateUser = async (req, res, next) => {
  try {
    await updateValidation.validateAsync(req.body);
    //this kind of data is passed through, not through query params as query param exposes data in the url

    //if validate move to next functionality
    next();

    // otherwise it will go to catch block
  } catch (error) {
    return res.send({
      status: 400,
      message: "Validation error",
      data: {},
      error: error.message,
    });
  }
};

// remove
const removeValidation = joi.object({
  userId: joi.string().max(64).required(), // purpose of validation is to make sure user has entered the username/userId
});

const removeUser = async (req, res, next) => {
  try {
    await removeValidation.validateAsync(req.query);
    //this kind of data is passed through, not through query params as query param exposes data in the url
    //if validate move to next functionality
    next();

    // otherwise it will go to catch block
  } catch (error) {
    return res.send({
      status: 400,
      message: "Validation error",
      data: {},
      error: error.message,
    });
  }
};

module.exports = { createUser, getUser, getAllUsers, updateUser, removeUser };

//agar validation successful ho jaye to hum response return nahi kerwatay next pe jatay hain error k case me response return kertay hain
