const DateTatoo = require("../../models/dateTatooInfo").model;

const create = async (agendaTatooData) => {
  const {
    id_studio,
    id_staff,
    id_tatuador,
    id_cliente,
    id_size,
    start,
    end,
    addDate,
    title,
    description,
    desPhoto,
    tipoTatoo,
    cost,
    estimated,
    adelanto,
  } = agendaTatooData;
  const agendaTatoo = new DateTatoo({
    id_studio,
    id_staff,
    id_tatuador,
    id_cliente,
    id_size,
    start,
    end,
    title,
    addDate,
    description,
    desPhoto,
    tipoTatoo,
    cost,
    estimated,
    adelanto,
  });
  const saveDate = await agendaTatoo.save();
  return saveDate;
};

const getByIdStudio = async (idStudio) => {
  const dateByStudio = await DateTatoo.find({ id_studio: idStudio }).exec();
  return dateByStudio;
};

/*
const getByStudio = async (idstudio) => {
  const allUser = await User.find({ idStudio: idstudio })
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbef7361603fab47f01fcb");
  return allUser;
};
const getByIdStudioVyTatuador = async (idStudio) => {
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
    licenseImage,
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
        licenseImage,
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

module.exports = { create, update, getById, get };*/
module.exports = { create, getByIdStudio };
