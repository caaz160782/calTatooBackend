const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  id_user: {
    type: Schema.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    trim: true,
    maxLength: 100,
    minLength: 1,
    required: true,
  },
  description: {
    type: String,
    trim: true,
    maxLength: 100,
    minLength: 1,
    required: true,
  },
  picture: {
    type: String,
    trim: true,
  },
  rfc: {
    type: String,
    trim: true,
    maxLength: 13,
    minLength: 1,
  },
  postalCode: {
    type: Number,
    trim: true,
    required: true,
  },
  municipality: {
    type: String,
    maxLength: 50,
    required: true,
  },
  state: {
    type: String,
    maxLength: 50,
    required: true,
  },
  city: {
    type: String,
    maxLength: 50,
    required: true,
  },
  address: {
    type: String,
    maxLength: 100,
    required: true,
  },
  phoneStudio: {
    type: String,
    trim: true,
    maxLength: 12,
    minLength: 1,
    required: true,
  },
  phoneWhatsApp: {
    type: String,
    trim: true,
    maxLength: 12,
    minLength: 1,
    required: true,
  },
  social: {
    type: Array,
    required: false,
  },
  activeStudio: {
    type: Boolean,
    default: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  model: mongoose.model("TatooStudio", schema),
  schema,
};
