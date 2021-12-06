
const User = require("../../models/users").model;
const hash = require("../../lib/crypt");
//const jwt = require("../../lib/jwt");

const create = async(userData) => {

  const { password, ...rest } = userData;
  const passwordHash = await hash.hashPassword(password);

  const staff = new User({
    password: passwordHash,
    ...rest,
  });
  const savedStaff = await staff.save();
  return savedStaff;
};

const get = async () => {
  const allUser = await User.find({}).exec();
  return allUser;
};

const getById = async (userId) => {
  const user = await User.findById(userId).exec();
  return user;
};
const remove = async (userId) => {
   await User.findByIdAndDelete(userId).exec();
  //return user;
};

module.exports = { create, get, getById, remove };

