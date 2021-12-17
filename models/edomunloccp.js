const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const schema = new Schema({
  idEstado: {
      type:Number,
  },
  estado:{
      type:String,
  },
  idMunicipio:{
      type:Number,
  },
  nombreMunicipio:{
      type:String,
  },
  idloc:{
      type:Number,
  },
  localidad:{
      type:String,
  },
  cp: {
      type:Number,
  },
});

module.exports = {
  model: moongoose.model("Estado", schema),
  schema,
};
