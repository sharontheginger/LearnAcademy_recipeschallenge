'use strict';

let RecipeList = require('../models').RecipeList

module.exports = {
  up: function (queryInterface, Sequelize) {
    return RecipeList.findAll().then(function(lists){ // returns a promise
      let recipePromises = lists.map(function(list){
        return queryInterface.bulkInsert('Recipes',
        [
          {
            ingredients: '1',
            recipeListId: list.get('id'),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            ingredients: '2',
            recipeListId: list.get('id'),
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ])
      })
      return Promise.all(recipePromises)
    })
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Recipes', null, {})
  }
};
