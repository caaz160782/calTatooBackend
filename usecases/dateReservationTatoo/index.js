const DateTatoo = require("../../models/dateTatooInfo").model;

const create = async (agendaTatooData) => {
  const {
    id_studio,
    id_tatuador,
    id_cliente,
    id_size,
    start,
    end,
    title,
    hourTatooStart,
    hourTatooFinish,
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
    hourTatooStart,
    hourTatooFinish,
    title,
    description,
    desPhotoTatoo,
    tipoTatoo,
    cost,
    estimated,
  });
  const saveDate = await agendaTatoo.save();
  return saveDate;
};

const getById = async (idStudioDate) => {
  const studio = await DateTatoo.findById(idStudioDate)
    .populate("id_tatuador", ["name", "lastName"])
    .exec();
  return studio;
};

const getByIdStudio = async (idStudio) => {
  const dateByStudio = await DateTatoo.find({ id_studio: idStudio })
    .populate("id_tatuador", ["name", "lastName"])
    .exec();
  return dateByStudio;
};

const deleteDate = (idDate) => {
  return DateTatoo.findByIdAndDelete(idDate).exec();
};

// Modificar info de estudios
const update = async (idDate, dateTatooData) => {
  const { start, end, hourTatooStart, hourTatooFinish, motivo } = dateTatooData;
  return DateTatoo.findByIdAndUpdate(
    idDate,
    {
      start,
      end,
      hourTatooStart,
      hourTatooFinish,
      motivo,
    },
    { new: true }
  ).exec();
};
const updatePayment = async (idDate) => {
  // const { start, end, description, motivo } = dateTatooData;
  return DateTatoo.findByIdAndUpdate(
    idDate,
    {
      statusPago: true,
      backgroundColor: "#519259",
      textColor: "#FAEEE7",
      borderColor: "#24A19C",
    },
    { new: true }
  ).exec();
};
/*module.exports = { create, update, getById, get };*/
module.exports = {
  create,
  getByIdStudio,
  getById,
  deleteDate,
  update,
  updatePayment,
};
