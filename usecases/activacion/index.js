const activa = require("../../models/activacion").model;
const { v4: uuidv4 } = require("uuid");

const create = async (id_user) => {
  const hash = uuidv4();
  const activaUser = new activa({
    hash,
    id_user,
  });
  const activaUserCreated = await activaUser.save();
  return activaUserCreated;
};

const get = async (hash) => {
  const infoHash = await activa.findOne({ hash: hash }).exec();
  return infoHash;
};

const deleteHash = (idHash) => {
  return activa.findByIdAndDelete(idHash).exec();
};

module.exports = { create, get, deleteHash };
