const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://akidb:12345@nodeexpress-jwt-test.6h6bxnj.mongodb.net/Exams23001";
mongoose.connect(uri, { useNewUrlParser: true});

const connection = mongoose.connection;
connection.once('open', ()=> {
    console.log("MongoDB database connection established successfully");
})

const Schema = mongoose.Schema;

const recordSchema = new Schema({
  name: { type: String, required: true },
  sid: { type: String, required: true },
});

const ExamRecord = mongoose.model("QuizExamRecord", recordSchema);
const router = require("express").Router();

router.route("/").get((req, res) => {
  const name = "Akinori Ikeda";
  const sid = "300351701";

  const newRecord = new ExamRecord({
    name,
    sid,
  });

  console.log("adding new information");

  newRecord
    .save()
    .then(() => res.json("Added new information"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// app.use('/quizexamrecords', router);
app.use('/', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}!`);
});



