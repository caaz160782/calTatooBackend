const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  rol: {
    type: String,
    minlenght: 1,
    required: true,
  },
});

module.exports = {
  model: mongoose.model("Rol", schema),
  schema,
};
