const Staff = require("../../models/users").model;
const hash = require("../../lib/crypt");
const jwt = require("../../lib/jwt");


//crear user
const create = async (userData) => {
  const {
    idRole,
    name,
    lastName,
    email,
    phoneHome,
    phonePersonal,
    curp,
    rfc,
    userName,
    pasword,
  } = userData;
  const passwordHash = await hash.hashPassword(pasword);
  //const  user = new User({fullName,role,userName,password:passwordHash});
  const user = new User({
    idRole,
    name,
    lastName,
    email,
    phoneHome,
    phonePersonal,
    curp,
    rfc,
    userName,
    password: passwordHash,
  });
  const savedUser = await user.save();
  return savedUser;
};

module.exports = {  create };

