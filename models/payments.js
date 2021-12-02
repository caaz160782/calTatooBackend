const moongoose = require("mongoose");
const Schema = moongoose.Schema;

const schema = new Schema({
  idTatooInfo: {},
  advance: {},
});

module.exports = {
  model: moongoose.model("Payment", schema),
  schema,
};
