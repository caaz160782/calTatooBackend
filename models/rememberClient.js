const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  description: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = {
  model: mongoose.model("Remember", schema),
  schema,
};
