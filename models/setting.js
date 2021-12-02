const mongoose = require("mongoose");
const Schema = moongoose.Schema;

const schema = new Schema({
  logo: {
    type: String,
    minlenght: 1,
  },
  timeToOpen: {
    type: Number,
    required: true,
  },
  timeToClose: {
    type: Number,
    required: true,
  },
  dateAvailable: {
    type: Array,
    required: false,
  },
  notifications: {
    type: Array,
    required: false,
  },
});
module.exports = {
  model: mongoose.model("Setting", schema),
  schema,
};
