
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

module.exports = { create, get };

