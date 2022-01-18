const tatooStudio = require("../../models/tatooStudio").model;

// Crear estudio
const create = async (studioData, id_user) => {
  const {
    name,
    description,
    picture,
    postalCode,
    municipality,
    state,
    city,
    address,
    phoneWhatsApp,
    phoneStudio,
    rfc,
    social,
  } = studioData;
  const studio = new tatooStudio({
    id_user,
    name,
    description,
    picture,
    postalCode,
    municipality,
    state,
    city,
    address,
    phoneWhatsApp,
    phoneStudio,
    rfc,
    social,
  });
  const savedStudio = await studio.save();
  return savedStudio;
};

const get = async (idUser) => {
  const studioByIdUser = await tatooStudio.findOne({ id_user: idUser }).exec();
  return studioByIdUser;
};

const getById = async (idStudio) => {
  const studio = await tatooStudio.findById(idStudio).exec();
  return studio;
};

// Modificar info de estudios
const update = async (studioId, studioData) => {
  const {
    name,
    description,
    picture,
    postalCode,
    phoneWhatsApp,
    phoneStudio,
    rfc,
    social,
  } = studioData;

  return tatooStudio
    .findByIdAndUpdate(
      studioId,
      {
        name,
        description,
        picture,
        postalCode,
        phoneWhatsApp,
        phoneStudio,
        rfc,
        social,
      },
      { new: true }
    )
    .exec();
};

module.exports = { create, update, getById, get };
