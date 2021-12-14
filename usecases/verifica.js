const User = require("../models/users").model;

const existEmail = async (email ="")=>{
    //console.log(email);
    const emailExist = await User.findOne({email});
    if(emailExist){
        throw new Error("el correo ya existe");
    }
};




module.exports={existEmail}