'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Places', [
      {
      longitude: '37.61694938659667',
      latitude: '55.75348529556231',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      longitude: '37.62694938659667',
      latitude: '55.76348529556231',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      longitude: '37.63694938659667',
      latitude: '55.77348529556231',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      longitude: '37.64694938659667',
      latitude: '55.87348529556231',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      longitude: '37.65694938659667',
      latitude: '55.88348529556231',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      longitude: '37.75694938659667',
      latitude: '55.89348529556231',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
