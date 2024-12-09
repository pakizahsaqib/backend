const { Model, DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const { v4: uuid } = require("uuid");
//there are so many version but we would use v4

//ORM Converts class into table and this is been done by model, and table data datatypes are provide by DataTypes

//https://www.npmjs.com/package/bcryptjs

var { hash } = require("bcryptjs"); //hash is a promise function

class users extends Model {}

users.init(
  {
    userId: {
      type: DataTypes.STRING(80), // max length woould be 80 // this will be generated through some tool/logic that take 64 length
      primaryKey: true, //FAQ unique key vs primary key ---- here there is no need of unique key flag, as primary key itself make sure uniqueness.
      //autoIncrement: true // it's considered a bad praactice.
    },
    name: {
      type: DataTypes.STRING(34),
      allowNull: false,
    },
    username: {
      // username can not be primary key as it may contain spaces, or it can be of any length, its better to avoid
      type: DataTypes.STRING(), // it can be left empty, as by default it size is 255
      allowNull: false,
      unique: true,
    },
    email: {
      // username can not be primary key as it may contain spaces, or it can be of any length, its better to avoid
      type: DataTypes.STRING(),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(1000), //it will use hashmap
      allowNull: false,
    },
  },
  {
    timestamps: true, // by default it is true (so we can also remove it from here),
    //this is creating two additional column (createdtime, updatedTime) in db, it against each records add created time,
    //and updated time, initially updated time is as same as creation time but later on, when we update record created stays the same,
    //but update is updated with change time
    paranoid: true, //by default it is false. // add deleted at NULL to each record
    // such records that deleted at === null, mean those record that are not deleted
    sequelize,
  }
);
//Whenever we have to decide attributes, think for a while either we actually need them in current scenarion or not
users.beforeCreate(async (user) => {
  //beforeCreate is a hook, as hook has before and after effects
  user.userId = uuid();
  user.password = await hash(user.password, 10); // 10 is a standard for saltround to increase the difficulty of password
  //user.password is a plain text for say 12345678, it will ne hashed with salt round 10 and then it will be passed to user.password
});
users.afterCreate(async (user) => {
  delete user.dataValues.password;
});
module.exports = users;
