const localidad = require("../../models/edomunloccp").model;


const get = async () => {
  const allLocalidades = await localidad.find({}).exec();
  return allLocalidades;
};


const find = async (cp) => {
  const found = await localidad.find({cp});
  if (found !== null) {
    //const { _id, estado, nombreMunicipio,localidad } = found;
     return found
  console.log(1)
  } else {
    return { message: 3 };
  }
};

module.exports = { get,find };