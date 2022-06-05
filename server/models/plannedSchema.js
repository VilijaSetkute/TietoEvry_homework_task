const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const plannedSchema = new Schema({
    recipe: {
        user: {type: String, required: true},
        timestamp: {type: Number, required: true},
        quarter: {type: Number, required: true},
        uri: {type: String, required: true},
        label: {type: String, required: true},
        images: {type: Object, required: true},
        source: {type: String, required: true},
        url: {type: String, required: true},
        ingredientLines: {type: Array, required: true},
        calories: {type: Number, required: true},
        totalWeight: {type: Number, required: true},
        cuisineType: {type: Array, required: true},
        mealType: {type: Array, required: true},
        dishType: {type: Array, required: true},
        totalDaily: {type: Object, required: true},
        digest: {type: Array, required: true}
    }
})

module.exports = mongoose.model('plans', plannedSchema)
