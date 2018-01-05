var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var bodyParser = require('body-parser')
var app = express();
var RecipeList = require('./models').RecipeList
var Recipe = require('./models').Recipe

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')
app.use(expressLayouts)


app.get('/', function (request, response) {
  RecipeList.findAll().then(function(recipeLists){
    response.render('index', {recipeLists: recipeLists})
  }).catch(function(error){
    response.send("Error, couldn't fetch RecipeLists")
  })
});

app.get('/recipe-list/:id', function(request, response){
  RecipeList.findById(request.params.id,
    {include: [{
      model: Recipe,
      as: 'recipes'
    }]
  }).then(function(recipeList){
    response.render('recipe-list', {recipeList: recipeList, recipes: recipeList.recipes})
  }).catch(function(error){
    console.log(error)
  })
})

app.post('/recipe-list/:recipeListId/recipe/new', function(request, response){
  RecipeList.findById(request.params.recipeListId).then(function(recipeList){
    return recipeList.createRecipe({
      ingredients: request.body.ingredients

    })
  }).then(function(recipe){
    response.redirect("/recipe-list/" + request.params.recipeListId)
  }).catch(function(error){
    response.send("Error, couldn't create Recipe")
  })
})

app.post('/recipe-list/:recipeListId/recipe/:id/delete', function(request, response){
  Recipe.findById(request.params.id).then(function(recipe){
    return recipe.destroy()
  }).then(function(recipe){
    response.redirect("/recipe-list/" + request.params.recipeListId)
  }).catch(function(error){
    response.send("Error, couldn't fetch Recipe")
  })
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});
