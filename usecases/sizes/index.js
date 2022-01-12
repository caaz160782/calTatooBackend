const Size = require("../../models/sizes").model;

const get = async () => {
  const sizes = await Size.find({}).exec();
  return sizes;
};

module.exports = { get };
