const { models } = require("../index");
const { Op } = require("sequelize");
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

  getAllUser: async (offset, query) => {
    try {
      const data = await models.users.findAndCountAll({
        //where:{} AND operator
        //where:[] OR operator
        where: {
          [Op.or]: [
            { ...(query.name ? { name: query.name } : true) },
            { ...(query.username ? { username: query.username } : true) },
            { ...(query.email ? { email: query.email } : true) },
          ],
        },
        attributes: {
          exclude: ["password", "deletedAt"],
        },

        offset: offset,
        limit: query.limit,
        order: [
          [
            query.orderBy ? query.orderBy : "createdAt", // On which column we want to apply sorting
            query.order ? query.order : "DESC", //  What kind of sorting ascending or descending we want to apply
          ],
        ],
        //paranoid: false,
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
  //{ userId, ...body } here we are destructuring, separating userId to apply where condition ,
  //and then applying rest operator with body to pass the rest of data for iupdation
  updateUser: async ({ userId, ...body }) => {
    try {
      const data = await models.users.update(
        { ...body },
        { where: { userId: userId } }
      );
      return {
        data: data,
      };
    } catch (error) {
      return { error };
    }
  },
  deleteUser: async ({ userId }) => {
    try {
      const data = await models.users.destroy({ where: { userId: userId } });
      return {
        data: data,
      };
    } catch (error) {
      return { error };
    }
  },
};
