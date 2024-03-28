'use strict';
const bcrypt = require('bcryptjs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   const users = require('../data/users.json').map((el) => {
     const hashPass = bcrypt.hashSync(el.password, 8)
    el.updatedAt = el.createdAt = new Date()
    el. password = hashPass

    return el
   })
   await queryInterface.bulkInsert('Users', users)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null)
  }
};
