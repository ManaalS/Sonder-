const mongoose = require("mongoose");
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
var connection = mongoose.createConnection("mongodb+srv://ruqiam:flower510@cluster0-orxel.gcp.mongodb.net/journal?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection);
// this will be our data base's data structure
const JournalSchema = new Schema(
 {
   name: String,
   thought1: String,
   thought2: String,
   thought3: String,
   thought4: String,
   t1: Boolean,
   t2: Boolean,
   t3: Boolean,
   t4: Boolean,
   reflections: String,
   date: Date

 },
 { timestamps: true }
);
JournalSchema.plugin(autoIncrement.plugin, "JournalData");
// export the new Schema so we could modify it using Node.js
module.exports = mongoose.model("JournalData", JournalSchema);
