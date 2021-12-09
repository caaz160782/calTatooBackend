const mongoose = require("mongoose");
require('mongoose-type-email');
const Schema = mongoose.Schema;

const schema = new Schema({
    // idRole: {
    //   type: Schema.ObjectId,
    //   ref: "Rol",
    //   required: true,
    // },
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
            correctTld: true,
            unique:true
    },
    phoneNumber: {
      type: String,
      trim: true,
      maxlenght: 10,
      minlenght: 1,
    }, 
    age: {
      type: String,
      trim: true,
      minlenght: 2,
    },
    socialNetwork: {
      type: String,
      trim: true,
      maxlenght: 50,
      minlenght: 1,
    },
    picture:{ 
      type:String, 
  },
    statusClient: Boolean,
});

module.exports = {
  model: mongoose.model("Client", schema),
  schema,
};