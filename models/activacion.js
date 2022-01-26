const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  hash: {
    type: String,
    minlenght: 1,
    required: true,
  },
  id_user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  model: mongoose.model("Activacion", schema),
  schema,
};
