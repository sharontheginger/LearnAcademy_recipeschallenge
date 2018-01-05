'use strict';
module.exports = (sequelize, DataTypes) => {
  var RecipeList = sequelize.define('RecipeList', {
    name: DataTypes.STRING,
    directions: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        RecipeList.hasMany(models.Recipe, {
          foreignKey: 'recipeListId',
          as: 'recipes'
        })
      }
    }
  });
  return RecipeList;
};
