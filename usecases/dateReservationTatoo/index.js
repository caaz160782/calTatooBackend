const DateTatoo = require("../../models/dateTatooInfo").model;

const create = async (agendaTatooData) => {
  const {
    id_studio,
    id_tatuador,
    id_cliente,
    id_size,
    start,
    end,
    addDate,
    title,
    description,
    desPhotoTatoo,
    tipoTatoo,
    cost,
    estimated,
  } = agendaTatooData;
  const agendaTatoo = new DateTatoo({
    id_studio,
    id_tatuador,
    id_cliente,
    id_size,
    start,
    end,
    title,
    addDate,
    description,
    desPhotoTatoo,
    tipoTatoo,
    cost,
    estimated,
  });
  const saveDate = await agendaTatoo.save();
  return saveDate;
};

const getById = async (idStudio) => {
  const studio = await DateTatoo.findById(idStudio).exec();
  return studio;
};

const getByIdStudio = async (idStudio) => {
  const dateByStudio = await DateTatoo.find({ id_studio: idStudio }).exec();
  return dateByStudio;
};

const deleteDate = (idDate) => {
  return DateTatoo.findByIdAndDelete(idDate).exec();
};

// Modificar info de estudios
const update = async (idDate, dateTatooData) => {
  const { start, end, description, motivo } = dateTatooData;
  return DateTatoo.findByIdAndUpdate(
    idDate,
    {
      start,
      end,
      description,
      motivo,
    },
    { new: true }
  ).exec();
};
/*module.exports = { create, update, getById, get };*/
module.exports = { create, getByIdStudio, getById, deleteDate, update };
