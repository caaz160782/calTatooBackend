const mongoose = require("mongoose");
                 require('mongoose-type-email');
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
    maxlenght: 20,
    minlenght: 1,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    maxlenght: 20,
    minlenght: 1,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
    trim: true,
    correctTld: true,
    maxlenght: 50,
    minlenght: 1,
    unique: true,
  },
  phoneHome: {
    type: String,
    trim: true,
    maxlenght: 10,
    minlenght: 1,
  },
  phonePersonal: {
    type: String,
    trim: true,
    maxlenght: 10,
    minlenght: 1,
  },
  curp: {
    type: String,
    trim: true,
    maxlenght: 18,
    minlenght: 1,
  },
  rfc: {
    type: String,
    trim: true,
    maxlenght: 13,
    minlenght: 1,
  },
  userName: {
    type: String,
    trim: true,
    maxlenght: 50,
    minlenght: 1,
  },
  password: {
    type: String,
    required: true,
    minlenght: 1,
  },
  statusUser: Boolean,
});
module.exports = {
  model: mongoose.model("User", schema),
  schema,
};
