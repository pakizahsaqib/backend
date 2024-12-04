//module.exports = {} //Old methods for export before ES6
//why are we not using import - as we can see the same syntax is used throughout the file, just to retain that,
//we will use modeule.export and module.import, and require - its a legacy syntax....es6 can be used by activation esLint

//As a good practice its suggested to PERFORM CRUD (put, get, put/patch, delete) in order
const {
  createUser,
  getAllUser,
  getUser,
} = require("../database/models/userModel");
const responseHandler = require("../responseHandler");

const create = async (req, res) => {
  try {
    const user = await createUser(req.body);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error });
  }
};

const getAll = async (req, res, next) => {
  try {
    const user = await getAllUser(req.query);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error });
  }
};
const getOne = async (req, res, next) => {
  try {
    const user = await getUser(req.query);
    return responseHandler(res, user);
  } catch (error) {
    return responseHandler(res, { error });
  }
};
const update = (req, res) => {
  return res.send({
    status: 200,
    message: "User updated successfully",
    data: req.body,
    error: {},
  });
};

const remove = (req, res, next) => {
  //res.json({"delete":"Data Deleted"})
  const { username } = req.query;
  const resultant_array = user.filter((item) => item.username !== username);
  console.log(resultant_array);
  return res.send(resultant_array);
};

module.exports = { create, getAll, getOne, update, remove };

// const { createUser } = require("../database/models/userModel");
// const responseHandler = require("../responseHandler");

// const user = [
//   {
//     name: "Pakizah",
//     username: "pakizah",
//     email: "pakizahsaqib@gmail.com",
//     password: "12345678",
//   },
//   {
//     name: "Ali",
//     username: "ali123",
//     email: "ali@gmail.com",
//     password: "12345678",
//   },
//   {
//     name: "Ahmad",
//     username: "ahmad1",
//     email: "ahmad@gmail.com",
//     password: "12345678",
//   },
// ];

// const create = async (req, res) => {
//   try {
//     const user = await createUser(req.body);
//     return responseHandler(res, user);
//   } catch (error) {
//     return responseHandler(res, { error });
//   }
// };

// // const create = (req, res, next) => {
// //   // sensitive data is usually passed as  part of body, best to get it through request.body
// //   // we can also recieve req.body by destructuring it
// //   // const {username,password} = req.body
// //   // further username and password is validated at this point
// //   //other way to send the whole object is to sent res like res.json ({"username":"abc","password"="12345" })

// //   console.log(user);
// //   user.push(req.body);
// //   return res.send({
// //     message: "Data Creation",
// //     data: req.body,
// //   });
// // };
// const getAll = (req, res, next) => {
//   //to use data from req like we can get the for say name from query through
//   // const {name} = req.query

//   //res.json({"allusers":"all users displayed"})

//   console.log(req.query);
//   return res.send({
//     message: "User: - getAll exact path",
//     data: user,
//   });
// };
// const update = (req, res) => {
//   const { username, name, email } = req.body;
//   const userIndex = user.findIndex((item) => item.username === username);

//   if (userIndex !== -1) {
//     user[userIndex] = {
//       ...user[userIndex],
//       name: name || user[userIndex].name,
//       email: email || user[userIndex].email,
//     };

//     return res.send({
//       status: 200,
//       message: "User updated successfully",
//       data: user[userIndex],
//     });
//   } else {
//     // Handle case where user is not found
//     return res.send({
//       status: 404,
//       message: "User not found",
//     });
//   }
// };

// const remove = (req, res, next) => {
//   //res.json({"delete":"Data Deleted"})
//   const { username } = req.query;
//   const resultant_array = user.filter((item) => item.username !== username);
//   console.log(resultant_array);
//   return res.send(resultant_array);
// };

// module.exports = { create, getAll, update, remove };
