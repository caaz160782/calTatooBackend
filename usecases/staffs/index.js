//const User = require("../../models/users").model;
//const hash = require("../../lib/crypt");
const User = require("../../models/users").model;
const hash = require("../../lib/crypt");
//const jwt = require("../../lib/jwt");

const create = async(userData) => {

  const { password, ...rest } = userData;
  const passwordHash = await hash.hashPassword(password);
  // const passwordHash = 'jijjiiji'
  //const  user = new User({fullName,role,userName,password:passwordHash});


  const staff = new User({
    password: passwordHash,
    ...rest,
  });
  const savedStaff = await staff.save();
  console.log(staff);
  return savedStaff;
};

module.exports = { create };


/*
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

module.exports = { find };*/
