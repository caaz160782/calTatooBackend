const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  size: {
    type: String,
    minlenght: 1,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    required: true,
  },
});

module.exports = {
  model: mongoose.model("Size", schema),
  schema,
};
