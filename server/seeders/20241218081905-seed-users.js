'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Asep',
        username: 'asep',
        preferred_timezone: 'Asia/Jakarta',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Agus',
        username: 'agus',
        preferred_timezone: 'Asia/Jayapura',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ujang',
        username: 'ujang',
        preferred_timezone: 'Pacific/Auckland',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};

