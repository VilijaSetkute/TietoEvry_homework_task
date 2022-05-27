const express = require("express");
const router = express.Router();

// middleware
const {searchParamsValidator} = require("../middleware/recipeMiddleware");
const {weightParamsValidator} = require("../middleware/weightMiddleware");

// controllers
const {allRecipesController, searchRecipesController} = require("../controllers/recipeController");
const {weightLogController} = require("../controllers/weightController");
const {kcalTableController} = require("../controllers/calculationController");

// routes
// --- recipes
router.get("/initial-recipes", allRecipesController);
router.post("/search", searchParamsValidator,searchRecipesController);
// --- body composition
router.post("/metrics", weightParamsValidator, weightLogController);
// --- calories table calculation
router.post("/calorie-table", kcalTableController);


module.exports = router ;