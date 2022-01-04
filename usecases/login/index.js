const User = require("../../models/users").model;
const hash = require("../../lib/crypt");
const jwt =require("../../lib/jwt");

const find = async (userAccess) => {
  const { email, password } = userAccess;
  const passwordF=password;
  const found = await User.findOne({ email }).populate("idRole",['rol']);
    if (found !== null) {
    const { _id, name,lastName, picture,idRole,password } = found;
    const rol=idRole.rol;
    const idRol=idRole._id;
    const fullName=name+' '+ lastName;
    const match = await hash.verifyPassword(passwordF, password);
    if (match) {
      const payload={
                    sub: _id.toString(),
                    name:fullName,
                    idRol,
                    rol
                  }
      const token= jwt.token(payload);
      const infoUser={rol,
                      name:fullName,
                      picture
                      }
      return{token,message:1,infoUser};
    } else {
      return { message: 2 };
    }
  } else {
    return { message: 3 };
  }
};

module.exports = { find };
