const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cursSchema = new Schema({
  titlu: { type: String, required: true },
  descriere: { type: String, required: true },
  image: { type: String, required: false },
  // creator: { type: mongoose.Types.ObjectId, required: true, ref: "Admin" },
  comentarii: [Object],
  likes: [String],
});

module.exports = mongoose.model("Curs", cursSchema);
