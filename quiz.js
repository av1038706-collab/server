let mongoose = require('mongoose');

let quizSchema = new mongoose.Schema({
    question: String,
    options: {
        option1: String,
        option2: String,
        option3: String,
        option4: String
    },
    correctOptions: String
});

module.exports = mongoose.model('Quiz', quizSchema);