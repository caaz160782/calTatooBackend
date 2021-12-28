const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id_tatoostudios: {
    type: Schema.ObjectId,
    ref: "TatooStudio",
    required: true,
  },
  logo: {
    type: String,
    minlenght: 1,
  },
  timeToOpen: {
    type: String,
    required: true,
  },
  timeToClose: {
    type: String,
    required: true,
  },
  dayAvailables: {
    type: Array,
    required: false,
  },
  notifications: {
    type: String,
    required: false,
  },
  statusSetting:{
    type: Boolean,
    default: true,
  },
  addedDate : { 
    type: Date, 
    default: Date.now 
  },
});
module.exports = {
  model: mongoose.model("Setting", schema),
  schema,
};
