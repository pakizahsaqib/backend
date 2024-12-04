const sequelize = require("./dbConnection");
//All tables will be imported here
const users = require("./tables/users");

const models = { users }; //const model = {users, admin, emoloyee} // other table will be combined here later on.
sequelize.models = models;

module.exports = { sequelize, models };
