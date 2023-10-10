const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const utilizatorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  image: { type: String, required: true },
  postari: [{ type: mongoose.Types.ObjectId, required: true, ref: "Postare" }],
  cursuriLike: [{ type: mongoose.Types.ObjectId, ref: "Curs" }],
  comentarii: [{ type: mongoose.Types.ObjectId, ref: "Comentariu" }],
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN", "UTILIZATOR"],
    default: "UTILIZATOR",
  },
});

utilizatorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Utilizator", utilizatorSchema);
