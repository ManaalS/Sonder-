const express = require('express');
const path = require('path');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const JournalData = require("./journal-data")
const router = express.Router();


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ruqiam:flower510@cluster0-orxel.gcp.mongodb.net/journal?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser:true, useUnifiedTopology: true });

// this is our MongoDB database
const dbRoute = "mongodb+srv://ruqiam:flower510@cluster0-orxel.gcp.mongodb.net/journal?retryWrites=true&w=majority";
// connects our back end code with the database
mongoose.connect(
 dbRoute,
 { useNewUrlParser: true  }
);
let db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
// checks if connection with the database is successful
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// this method adds new data in our database
router.post("/logJournal", (req, res) => {

 let journalData = new JournalData();
// console.log(req.body);

 const { name, thought1, thought2, thought3, thought4, t1, t2, t3, t4, reflections } = req.body;
 // if ((!id && id !== 0)) {
 //   return res.json({
 //     success: false,
 //     error: "INVALID INPUTS"
 //   });
 // }
 //sessionData.id = id
 journalData.name = name;
 journalData.thought1 = thought1;
 journalData.thought2 = thought2;
 journalData.thought3 = thought3;
 journalData.thought4 = thought4;
 journalData.t1 = t1;
 journalData.t2 = t2;
 journalData.t3 = t3;
 journalData.t4 = t4;
 journalData.reflections = reflections;

 // client.connect(err => {
   // const collection = client.db("journal").collection("collectionj");
   // perform actions on the collection object

     journalData.save(err => {
       if (err) {
         console.log(err);
         return res.json({ success: false, error: err });
       }
       return res.json({ success: true });
     });

 //   client.close();
 // });
});

app.get("/api/getJournals", (req, res) => {
 const person = req.query.name;
 JournalData.find( {name: person }, function(err,obj) {
   if (err) {
     console.log("Error ", err);
     return res.send(err);
   }
   return res.json({ success: true, journals: obj });
 });
});


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
})

app.get('/style.css', function (req, res) {
  res.sendFile(path.join(__dirname + '/style.css'));
})
app.get('/yuriy-kovalev-nN1HSDtKdlw-unsplash.jpg', function (req, res) {
  res.sendFile(path.join(__dirname + '/yuriy-kovalev-nN1HSDtKdlw-unsplash.jpg'));
})
app.use("/api", router);

app.listen(3000, () => console.log('Example app listening on port 3000!'))
