const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SurveySchema = new Schema({
    surveyId: String,
    gameGenre: String,
    daysPerYear: Number,
    age: Number,
});
mongoose.model('Survey', SurveySchema);