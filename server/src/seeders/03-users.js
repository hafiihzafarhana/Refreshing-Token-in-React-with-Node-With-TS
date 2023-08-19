"use strict";
const bcryptjs = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: "fac8531a-11c1-4d59-8634-b073acfe1b29",
          email: "hafiihza83@gmail.com",
          password: bcryptjs.hashSync("hafiihza83", 10),
          name: "Hafi Ihza",
          user_name: "ibun060606",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
