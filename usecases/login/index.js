const User = require("../../models/users").model;
const hash = require("../../lib/crypt");

const find = async (userAccess) => {
  const { email, pasword } = userAccess;
  const found = await User.findOne({ email }).exec();
  if (found !== null) {
    const { _id, name, lastName, email, password } = found;
    const match = await hash.verifyPassword(pasword, password);
    if (match) {
      return { message: 1 };
    } else {
      return { message: 2 };
    }
  } else {
    return { message: 3 };
  }
};

module.exports = { find };
