const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const schema = new Schema({
  id_studio: {
    type: Schema.ObjectId,
    ref: "TatooStudio",
    required: true,
  },
  id_tatuador: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  id_cliente: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  id_size: {
    type: Schema.ObjectId,
    ref: "size",
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  addDate: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    minlenght: 1,
    required: true,
  },
  description: {
    type: String,
    minlenght: 1,
    required: true,
  },
  desPhotoTatoo: {
    type: String,
    minlenght: 1,
    required: true,
  },
  tipoTatoo: {
    type: String,
    required: true,
  },
  motivo: {
    type: String,
    default: "",
  },
  cost: {
    type: String,
    required: true,
  },
  estimated: {
    type: String,
    required: true,
  },
  statusPago: {
    type: Boolean,
    default: false,
  },
});

module.exports = {
  model: mongoose.model("DateTatoo", schema),
  schema,
};
