let mongoose = require('mongoose');
let express = require('express');
let app = express();
let cors = require('cors')
let Quiz = require('./quiz')

let dotenv = require('dotenv');
dotenv.config();

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database coneected successfully    "))
.catch((error) => console.log(error.message, 'Database connection faild'))

app.get('/', (req, res) => {
    res.send('Hello World!');
})

// this is an API for getting questions from the database
// This is get mothod for geting data from database
app.get('/questions', async (req, res) => {
    try{
        const questions = await Quiz.find();
        res.json(questions);
    }
    catch(err){
        res.status(500).send({error : err.message})
    }
})

// this is post method for posting data on database
app.post('/postquestions', async (req,res) => {
    try{
        const newQuestion = new Quiz(req.body);
        const saveQuestions = await newQuestion.save();
        res.status(201).json(saveQuestions);
    }
    catch(err){
        res.status(500).send({err: err.message})
    }
})

app.listen(process.env.PORT, function() {
    console.log(`Server is running on port ${process.env.PORT}`);
})
