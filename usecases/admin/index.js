const User = require("../../models/users").model;
const hash = require("../../lib/crypt");

const create = async (userData) => {
  const { name, lastName, email, password, idRole, statusUser } = userData;
  const pswHash = await hash.hashPassword(password);
  const user = new User({
    name,
    lastName,
    email,
    password: pswHash,
    idRole,
    statusUser,
  });
  const createdUser = await user.save();
  return createdUser;
};

module.exports = { create };
