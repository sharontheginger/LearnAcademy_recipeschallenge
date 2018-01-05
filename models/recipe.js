'use strict';
module.exports = (sequelize, DataTypes) => {
  var Recipe = sequelize.define('Recipe', {
    ingredients: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Recipe.belongsTo(models.RecipeList,{
          foreignKey: 'recipeListId',
          onDelete: 'CASCADE'
        })
      }
    }
  });
  return Recipe;
};
