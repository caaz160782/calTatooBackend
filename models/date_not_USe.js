const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id_user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  id_tatuador: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  idTatooInfo: {
    id_user: {
      type: Schema.ObjectId,
      ref: "TatooInfo",
      required: true,
    },
  },
  dateAvailable: {
    type: Date,
  },
  hourTatoo: {
    type: Number,
    required: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  finished: Boolean,
});

module.exports = {
  model: mongoose.model("Date", schema),
  schema,
};
