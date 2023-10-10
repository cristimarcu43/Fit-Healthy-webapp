const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const comentSchema = new Schema({
  message: { type: String, required: true },
  autor: { type: mongoose.Types.ObjectId, required: true, ref: "Utilizator" },
  curs: { type: mongoose.Types.ObjectId, required: true, ref: "Curs" },
});

module.exports = mongoose.model("Curs", postSchema);
