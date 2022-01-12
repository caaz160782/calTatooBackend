const User = require("../../models/users").model;
const hash = require("../../lib/crypt");

const create = async (userData) => {
  const { idRole, name, lastName, password, email } = userData;
  const pswHash = await hash.hashPassword(password);
  const user = new User({
    idRole,
    name,
    lastName,
    password: pswHash,
    email,
  });
  const createdUser = await user.save();
  return createdUser;
};

const updateRegStudio = async (userId, registerStudio) => {
  return User.findByIdAndUpdate(
    userId,
    {
      registerStudio,
    },
    { new: true }
  ).exec();
};

const updateFinConfig = async (userId, finishConfig) => {
  return User.findByIdAndUpdate(
    userId,
    {
      finishConfig,
    },
    { new: true }
  ).exec();
};

module.exports = { create, updateRegStudio, updateFinConfig };
