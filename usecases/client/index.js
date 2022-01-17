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

  // .populate("idRole", ["rol"])
  // .where("idRole")
  // .equals("61bbeeca3143f1d4146eec10")
  // .exec();
  return client;
};
//crear cliente
const create = async (clientData) => {
  const { password, ...rest } = clientData;
  // console.log("userData", clientData);
  const passwordHash = await hash.hashPassword(password);
  const client = new Client({
    password: passwordHash,
    ...rest,
  });
  const savedClient = await client.save();
  return savedClient;
};
//eliminar
const remove = async (clientId) => {
  //console.log(clientId);
  const clientBorrado = await Client.findByIdAndUpdate(clientId, {
    statusUser: false,
  }).exec();
  return clientBorrado;
};
//modificar
const update = async (clientId, clientData) => {
  const { password, ...rest } = clientData;
  console.log("client", clientData);
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
  console.log("all", allUser);
  return allUser;
};

module.exports = { get, getById, create, remove, update, getByStudio };
