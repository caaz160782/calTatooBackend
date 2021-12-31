const Rol = require("../../models/rols").model;
//lista roles
const get = async () => {
  const allRols = await Rol.find({}).exec();
  return allRols;
};

const find = async (rol) => {
  const Rols = await Rol.findOne({rol}).exec();
  return Rols;
};

module.exports = { get,find };
