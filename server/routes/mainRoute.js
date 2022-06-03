const express = require("express");
const router = express.Router();

// middleware
const {searchParamsValidator} = require("../middleware/recipeMiddleware");
const {weightParamsValidator} = require("../middleware/weightMiddleware");
const {loginValidator, registerValidator} = require('../middleware/userMiddleware')

// controllers
const {allRecipesController, searchRecipesController} = require("../controllers/recipeController");
const {weightLogController} = require("../controllers/weightController");
const {kcalTableController} = require("../controllers/calculationController");
const {loginController, registerController, stayLoggedIn} = require('../controllers/userController')

// routes
// --- recipes
router.get("/initial-recipes", allRecipesController);
router.post("/search", searchParamsValidator,searchRecipesController);
// --- body composition
router.post("/metrics", weightParamsValidator, weightLogController);
// --- calories table calculation
router.post("/calorie-table", kcalTableController);
// -- user authentication
router.post('/login', loginValidator, loginController)
router.post('/register', registerValidator, registerController)
router.get('/stayLoggedIn', stayLoggedIn)


module.exports = router ;
