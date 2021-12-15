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
    maxLength: 20,
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
  licenseImage: {
    type: String,
    trim: true,
    maxLength: 100,
    minLength: 1,
  },
  rfc: {
    type: String,
    trim: true,
    maxLength: 13,
    minLength: 1,
  },
  postalCode: {
    type: String,
    trim: true,
    maxLength: 6,
    minLength: 1,
    required: true,
  },
  /*municipality:{},
   state:{},
   city:{},*/
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
