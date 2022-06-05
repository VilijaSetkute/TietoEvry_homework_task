require("dotenv").config();
const fetch = require("node-fetch");
const fullUrl = `${process.env.URL}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}&q=`;
const plannedSchema = require('../models/plannedSchema')
const favoritesSchema = require('../models/favoritesSchema')
const fetchSchema = require('../models/fetchSchema')

module.exports = {
    allRecipesController: async (req, res) => {
        fetch(fullUrl)
            .then(res => res.json())
            .then(data => {
                fetchSchema.deleteMany({})
                res.send({success: true, data});
            })
            .catch(err => {
                console.log(err);
            });
    },
    searchRecipesController: async (req, res) => {
        const {name, meal, dish} = req.body;
        const searchName = name.toLowerCase().replaceAll(" ", "%20");
        let searchMeal = "";
        let searchDish = "";
        if (!meal.includes("Select")) {
            searchMeal = "&mealType=" + meal.toLowerCase().replaceAll(" ", "%20");
        }
        if (!dish.includes("Select")) {
            searchDish = "&dishType=" + dish.toLowerCase().replaceAll(" ", "%20");
        }
        const searchUrl = `${fullUrl}${searchName}${searchMeal}${searchDish}`;
        fetch(searchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.count > 0) {
                    fetchSchema.insertMany(data.hits)
                    res.send({success: true, data, message: `We found ${data.count} recipe(s) for you`});
                } else {
                    res.send({success: false, message: "Opps... We could not find anything based on your search parameters"});
                }
            })
            .catch(err => {
                console.log(err);
            });
    },
    saveRecipeController: async (req, res) => {
        const {savingRecipe} = req.body
        try {
            const recipeExists = await fetchSchema.find({'recipe.uri': savingRecipe.recipe.uri})
            if (recipeExists.length === 0) {
                const saveRecipe = new fetchSchema({
                    recipe: {
                        uri: savingRecipe.recipe.uri,
                        label: savingRecipe.recipe.label,
                        images: savingRecipe.recipe.images,
                        source: savingRecipe.recipe.source,
                        url: savingRecipe.recipe.url,
                        ingredientLines: savingRecipe.recipe.ingredientLines,
                        calories: savingRecipe.recipe.calories,
                        totalWeight: savingRecipe.recipe.totalWeight,
                        cuisineType: savingRecipe.recipe.cuisineType,
                        mealType: savingRecipe.recipe.mealType,
                        dishType: savingRecipe.recipe.dishType,
                        totalDaily: savingRecipe.recipe.totalDaily,
                        digest: savingRecipe.recipe.digest
                    }
                })
                await saveRecipe.save()
                res.send({success: true, message: 'Recipe saved'})
            } else {
                res.send({success: true, message: 'Recipe already exists'})
            }
        } catch (err) {
            console.log(err);
        }
    },
    findRecipeController: async (req, res) => {
        const {rid} = req.body
        const foundRecipe = await fetchSchema.findOne({'recipe.uri': {
                $regex: rid
            }})
        res.send({success: true, recipe: foundRecipe})
    },
    userFavoritesController: async (req, res) => {
        const {user} = req.body
        const userFavorites = await favoritesSchema.find({'recipe.user': user})
        res.send({success: true, favorites: userFavorites})
    },
    handleFavoritesController: async (req, res) => {
        const {user, recipe} = req.body
        try {
            const findRecipe = await favoritesSchema.find({'recipe.user': user, "recipe.uri": recipe.uri})
            if (findRecipe.length === 0) {
                const addFavorite = new favoritesSchema({
                    recipe: {
                        user: user,
                        timestamp: 0,
                        quarter: 0,
                        uri: recipe.uri,
                        label: recipe.label,
                        images: recipe.images,
                        source: recipe.source,
                        url: recipe.url,
                        ingredientLines: recipe.ingredientLines,
                        calories: recipe.calories,
                        totalWeight: recipe.totalWeight,
                        cuisineType: recipe.cuisineType,
                        mealType: recipe.mealType,
                        dishType: recipe.dishType,
                        totalDaily: recipe.totalDaily,
                        digest: recipe.digest
                    }
                })
                await addFavorite.save()
                const userFavoritesUpdated = await favoritesSchema.find({'recipe.user': user})
                res.send({success: true, favorites: userFavoritesUpdated})
            } else {
                // remove
                await favoritesSchema.findOneAndDelete({'recipe.user': user, "recipe.uri": recipe.uri})
                const userFavoritesUpdated = await favoritesSchema.find({'recipe.user': user})
                res.send({success: true, favorites: userFavoritesUpdated})
            }
        } catch (err) {
            console.log(err);
        }
    },
    userPlannedController: async (req, res) => {
        const {user} = req.body
        const userPlanned = await plannedSchema.find({'recipe.user': user})
        res.send({success: true, planned: userPlanned})
    },
    handlePlannedController: async (req, res) => {
        const {user, recipe} = req.body
        console.log(user);
        try {
            const findRecipe = await plannedSchema.find({'recipe.user': user, "recipe.uri": recipe.uri})
            if (findRecipe.length === 0) {
                // add
                const addPlanned = new plannedSchema({
                    recipe: {
                        user: user,
                        timestamp: 0,
                        quarter: 0,
                        uri: recipe.uri,
                        label: recipe.label,
                        images: recipe.images,
                        source: recipe.source,
                        url: recipe.url,
                        ingredientLines: recipe.ingredientLines,
                        calories: recipe.calories,
                        totalWeight: recipe.totalWeight,
                        cuisineType: recipe.cuisineType,
                        mealType: recipe.mealType,
                        dishType: recipe.dishType,
                        totalDaily: recipe.totalDaily,
                        digest: recipe.digest
                    }
                })
                await addPlanned.save()
                const userPlannedUpdated = await plannedSchema.find({'recipe.user': user})
                res.send({success: true, planned: userPlannedUpdated})
            } else {
                // remove
                await plannedSchema.findOneAndDelete({'recipe.user': user, "recipe.uri": recipe.uri})
                const userPlannedUpdated = await plannedSchema.find({'recipe.user': user})
                res.send({success: true, planned: userPlannedUpdated})
            }
        } catch (err) {
            console.log(err);
        }
    },
};
