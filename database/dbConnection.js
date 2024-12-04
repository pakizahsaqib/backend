require("dotenv").config();

const { Sequelize } = require("sequelize"); //...should be capital Sequelize as it is declared this way in package
//db queries, table structure everyting is provide in sequelize package

//An instance of Sequelize is created
const sequelize = new Sequelize({
  //here we will add all the configuration of env
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});
//Here this instance will be authenticated
sequelize
  .authenticate() //its a promise
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = sequelize;
