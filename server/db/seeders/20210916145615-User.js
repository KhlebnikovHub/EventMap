'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
      email: 'roma@google.ru',
      firstname: "Roma",
      lastname: 'Romka',
      avatar: 'https://bigpicture.ru/wp-content/uploads/2019/04/grandbeauty00.jpg',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      email: 'leha@google.ru',
      firstname: "Alex",
      lastname: "Kior",
      avatar: 'https://cdn.fishki.net/upload/post/201406/06/1275504/40-of-the-most-amazing-humans-met-on-the-streets-by-the-humans-of-movement-worldwide34__700.jpg',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      email: 'danya@google.ru',
      firstname: 'Danya',
      lastname: 'Nordin',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSASyw4y7AGN8kwV_gpLiV_ubD35-oJUaUek8kPrFH5um6eLVdJ56_1jqo1u7Geh8WptxI&usqp=CAU',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      email: 'vladimir@google.ru',
      firstname: 'Volodya',
      lastname: 'Vladimirovich',
      avatar: 'https://s0.rbk.ru/v6_top_pics/media/img/1/28/755743646058281.jpeg',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    {
      email: 'kto-to@mail.ru',
      firstname: 'tiKto',
      lastname: 'tebeSkazhi',
      avatar: 'https://trendymen.ru/images/article1/127943/attachments/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA%20%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0%202019-10-24%20%D0%B2%2014.00.41.png',
      createdAt: new Date(),
      updatedAt:new Date()
    },
    
  ], {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
