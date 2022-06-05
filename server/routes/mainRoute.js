const express = require("express");
const router = express.Router();

// middleware
const {searchParamsValidator} = require("../middleware/recipeMiddleware");
const {weightParamsValidator} = require("../middleware/weightMiddleware");
const {loginValidator, registerValidator} = require('../middleware/userMiddleware')

// controllers
const {allRecipesController, searchRecipesController,
  userFavoritesController, handleFavoritesController,
  userPlannedController, handlePlannedController,
  saveRecipeController, findRecipeController} = require("../controllers/recipeController");
const {weightLogController, allUserWeightController} = require("../controllers/weightController");
const {kcalTableController, quarterController} = require("../controllers/calculationController");
const {loginController, registerController, stayLoggedIn} = require('../controllers/userController')

// routes
// --- recipes
router.get("/initial-recipes", allRecipesController);
router.post("/search", searchParamsValidator,searchRecipesController);
router.post("/save-single-recipe", saveRecipeController)
router.post("/find-single-recipe", findRecipeController)
router.post("/user-favorites", userFavoritesController)
router.post("/handle-favorites", handleFavoritesController)
router.post("/user-planned", userPlannedController)
router.post("/handle-planned", handlePlannedController)
router.post("/update-quarter", quarterController)
// --- body composition
router.post("/metrics", weightParamsValidator, weightLogController);
router.post('/all-weight-logs', allUserWeightController)
// --- calories table calculation
router.post("/calorie-table", kcalTableController);
// -- user authentication
router.post('/login', loginValidator, loginController)
router.post('/register', registerValidator, registerController)
router.get('/stayLoggedIn', stayLoggedIn)


module.exports = router ;
