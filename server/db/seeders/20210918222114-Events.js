'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Events', [
      {
      name: 'Tusa',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 3,
      image: '/uploads/937.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'TusbI',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 3,
      image: '/uploads/4787.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'DichBeach',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 4,
      image: '/uploads/16748.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Chuvaaaaaaak',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 5,
      image: '/uploads/bombooom.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Tusa na samokatax',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 6,
      image: '/uploads/bombooom.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Velosipednaya Tusa))',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 1,
      image: '/uploads/bombooom.jpg',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Godnaya Tusa))',
      description: 'Krutaya Tusa!)',
      user_id: 2,
      place_id: 1,
      image: '/uploads/skate.jpeg',
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
