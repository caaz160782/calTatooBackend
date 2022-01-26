const Client = require("../../models/users").model;
const hash = require("../../lib/crypt");

//listar  clientes
const get = async () => {
  const allClient = await Client.find({})
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbeeca3143f1d4146eec10")
    .exec();
  return allClient;
};

//ver los detalles de cliente  id
const getById = async (clientId) => {
  const client = await Client.findById(clientId);
  return client;
};
//crear cliente
const create = async (clientData) => {
  const client = new Client(clientData);
  const savedClient = await client.save();
  return savedClient;
};
//eliminar
const remove = async (clientId) => {
  const clientBorrado = await Client.findByIdAndUpdate(clientId, {
    statusUser: false,
  }).exec();
  return clientBorrado;
};
//modificar
const update = async (clientId, clientData) => {
  const { password, ...rest } = clientData;
  if (password) {
    const passwordHash = await hash.hashPassword(password);
    return Client.findByIdAndUpdate(clientId, {
      ...rest,
      password: passwordHash,
    }).exec();
  } else {
    return Client.findByIdAndUpdate(clientId, { ...rest }).exec();
  }
};
const getByStudio = async (idstudio) => {
  // console.log("all", idstudio);
  const allUser = await Client.find({ idStudio: idstudio })
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbeeca3143f1d4146eec10");
  return allUser;
};

const getByEmail = async (email) => {
  const { emailFind } = email;
  const client = await Client.findOne({ email: emailFind });
  return client;
};

const updatePassword = async (clientId, clientData) => {
  const { password, ...rest } = clientData;
  const passwordHash = await hash.hashPassword(password);
  return Client.findByIdAndUpdate(clientId, {
    ...rest,
    password: passwordHash,
  }).exec();
};

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
  getByStudio,
  getByEmail,
  updatePassword,
};
