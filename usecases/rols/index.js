const Rol = require("../../models/rols").model;
//lista roles
const get = async () => {
  const allRols = await Rol.find({}).exec();
  return allRols;
};

module.exports = { get };
