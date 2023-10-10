const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const likeSchema = new Schema({
  creator: { type: mongoose.Types.ObjectId, required: true, ref: "Utilizator" },
});

module.exports = mongoose.model("Curs", postSchema);
