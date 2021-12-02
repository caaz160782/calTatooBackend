const Rol = require("../../models/sizes").model;
//lista roles
const get = async () => {
  const sizes = await Rol.find({}).exec();
  return sizes;
};

module.exports = { get };
