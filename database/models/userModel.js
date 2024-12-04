const { models } = require("../index");
module.exports = {
  //input will be recieved from front end, so data will  come from body

  createUser: async (body) => {
    try {
      //.create before and after hook in users.js is executed when create is called
      //beforeCreate is called first then this line "await models.users.create({ ...body });" executes, and after that afterCreate
      //is called to delete the password as we dont return it to user when data is added successfully

      const data = await models.users.create({ ...body });
      //here as we have to pass each attribute like name, email, password etc, body has this, so we will spread it and pass it on
      //   const data = await models.users.create({
      //         userId: body.userId,
      //         username: body.username

      //    });
      return { data };
    } catch (error) {
      return { error };
    }
  },

  getAllUser: async () => {
    try {
      const data = await models.users.findAndCountAll({
        attributes: {
          exclude: ["password", "deletedAt"],
        },
        paranoid: false,
      });
      return { data };
    } catch (error) {
      return { error };
    }
  },
  getUser: async ({ username, userId }) => {
    try {
      const data = await models.users.findOne({
        where: { ...(username === "false" ? { userId } : { username }) },
        attribute: {
          exclude: ["password", "deletedAt"],
        },
        paranoid: false,
      });
      return { data };
    } catch (error) {
      return { error };
    }
  },
};
