const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")

const app = express();

var score = 0

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-abdurrahman:Test2.0@cluster0.s8jenvi.mongodb.net/simonGameDB", {useNewUrlParser: true})

const highscoreSchema = {
  name: String,
  score: Number
};

const Highscore = mongoose.model("Highscore", highscoreSchema)

// const highscore = new Highscore ({
//   name: "Abdur28",
//   score: 1
// });
//
// highscore.save()

app.get("/",function(req, res){
  Highscore.findOne({}, function(err, highscore){
    if (!err) {
      res.render("index", {highscore: highscore})
    }
  })
})

app.post("/", function(req, res){

  const update = {
    name: req.body.username,
    score: req.body.button
  }
  Highscore.findOneAndUpdate({}, {$set:update}, function(err){
    if (!err) {
      res.redirect("/")
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
