const rememberClient = require("../../models/rememberClient").model;
//lista  oipciones de  recordatorio al cliente
const get = async () => {
  const all = await rememberClient.find({}).exec();
  return all;
};

module.exports = { get };
