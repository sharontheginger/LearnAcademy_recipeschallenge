'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('RecipeLists',
    [
      {
        name: 'Spinach Salad',
        directions: '',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Macaroni and Cheese',
        directions: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('RecipeLists', null, {})
  }
};
