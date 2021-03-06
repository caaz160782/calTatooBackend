const mongoose = require("mongoose");
require("mongoose-type-email");
const Schema = mongoose.Schema;
const schema = new Schema({
  idRole: {
    type: Schema.ObjectId,
    ref: "Rol",
    required: true,
  },
  name: {
    type: String,
    trim: true,
    maxLength: 30,
    minLength: 1,
    required: [true, "Required name"],
  },
  lastName: {
    type: String,
    trim: true,
    maxLength: 50,
    minLength: 1,
    required: [true, "Required name"],
  },
  idStudio: {
    type: Schema.ObjectId,
    ref: "TatooStudio",
  },
  password: {
    type: String,
    trim: true,
    //minLength: [8, "the password required a minimun 8 characters"],
    //  required: [true, "Required name"],
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    trim: true,
    correctTld: true,
    maxLength: 50,
    minlenght: 1,
    unique: true,
  },
  phoneHome: {
    type: String,
    trim: true,
    maxLength: 12,
    minLength: 1,
  },
  phonePersonal: {
    type: String,
    trim: true,
    maxLength: 12,
    minLength: 1,
  },
  curp: {
    type: String,
    trim: true,
    maxLength: 18,
    minLength: 1,
  },
  rfc: {
    type: String,
    trim: true,
    maxLength: 13,
    minLength: 1,
  },
  nickName: {
    type: String,
    trim: true,
    maxLength: 50,
    minLength: 1,
  },
  age: {
    type: Number,
    trim: true,
  },
  socialNetwork: {
    type: String,
    trim: true,
    maxLength: 50,
    minLength: 1,
  },
  picture: {
    type: String,
  },
  registerStudio: {
    type: Boolean,
    default: false,
  },
  finishConfig: {
    type: Boolean,
    default: false,
  },
  statusUser: {
    type: Boolean,
    default: true,
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = {
  model: mongoose.model("User", schema),
  schema,
};
