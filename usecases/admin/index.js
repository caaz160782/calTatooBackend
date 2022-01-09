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

const update = async (userId, registerStudio, finishConfig) => {
  /*const { logo, timeToOpen, timeToClose, dayAvailables, notifications } =
    settingData;*/
  return User.findByIdAndUpdate(
    userId,
    {
      registerStudio,
      finishConfig,
    },
    { new: true }
  ).exec();
};

module.exports = { create, update };
