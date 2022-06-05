const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
  user: {type: String, required: true},
  bmi: {type: Number, required: true},
  bmiEval: {type: String, required: true},
  bmr: {type: Number, required: true},
  color: {type: String, required: true},
  timestamp: {type: Number, required: true},
  totalBmr: {type: Number, required: true}
})

module.exports = mongoose.model('weightLogs', weightSchema)
