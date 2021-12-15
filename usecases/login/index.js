const User = require("../../models/users").model;
const hash = require("../../lib/crypt");
const jwt =require("../../lib/jwt");
const { check } = require("express-validator");

const find = async (userAccess) => {
  const { email, pasword } = userAccess;
  const found = await User.findOne({ email }).populate("idRole",['rol']);
    if (found !== null) {
    const { _id, name, lastName,idRole,password } = found;
    const rol=idRole.rol;
    const fullName=name+' '+ lastName;

    const match = await hash.verifyPassword(pasword, password);
    if (match) {
      const payload={
                    sub: _id.toString(),
                    name:fullName,
                    rol
                  }
      const token= jwt.token(payload);
      return{token,message:1};
    } else {
      return { message: 2 };
    }
  } else {
    return { message: 3 };
  }
};

module.exports = { find };
