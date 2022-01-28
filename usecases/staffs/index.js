const User = require("../../models/users").model;
const hash = require("../../lib/crypt");

const create = async (userData) => {
  const { password, ...rest } = userData;
  //console.log("userData", userData);
  const passwordHash = await hash.hashPassword(password);
  const staff = new User({
    password: passwordHash,
    ...rest,
  });
  const savedStaff = await staff.save();
  return savedStaff;
};

const get = async (idstudio) => {
  const allUser = await User.find({})
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbef7361603fab47f01fcb");
  return allUser;
};

const getByStudio = async (idstudio) => {
  const allUser = await User.find({ idStudio: idstudio })
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbef7361603fab47f01fcb");
  return allUser;
};

const getById = async (userId) => {
  const user = await User.findById(userId).exec();
  return user;
};

const update = async (userId, userData) => {
  const { password, ...rest } = userData;
  //console.log("en el manejador", userData);
  if (password) {
    const passwordHash = await hash.hashPassword(password);
    return User.findByIdAndUpdate(userId, {
      ...rest,
      password: passwordHash,
    }).exec();
  } else {
    return User.findByIdAndUpdate(userId, { ...rest }).exec();
  }
};
const remove = async (userId) => {
  const userBorrado = await User.findByIdAndUpdate(userId, {
    statusUser: false,
  }).exec();
  return userBorrado;
};

module.exports = { create, get, getById, remove, update, getByStudio };
