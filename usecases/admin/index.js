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
    statusUser: true,
  });
  const createdUser = await user.save();
  return createdUser;
};

module.exports = { create };
