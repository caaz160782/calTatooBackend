const InfoTattoo = require("../../models/tatooInfo_notuse").model;

const get = async () => {
  const allDates = await InfoTattoo.find({}).exec();
  return allDates;
};

//ver los detalles cita id
const getById = async (dateId) => {
  const date = await InfoTattoo.findById(dateId).exec();
  return date;
};

const create = async (tattooInfo) => {
  const {
    idDate,
    idUser,
    idTatuador,
    description,
    desPhoto,
    idSize,
    tattooColor,
    tattooBN,
    cost,
    estimated,
  } = tattooInfo;
  const inftattoo = new InfoTattoo({
    idDate,
    idUser,
    idTatuador,
    description,
    desPhoto,
    idSize,
    tattooColor,
    tattooBN,
    cost,
    estimated,
  });
  const createdDated = await inftattoo.save();
  return createdDated;
};

const update = async (dateId, dateData) => {
  const {
    description,
    desPhoto,
    idSize,
    tattooColor,
    tattooBN,
    cost,
    estimated,
  } = dateData;
  return InfoTattoo.findByIdAndUpdate(
    dateId,
    { description, desPhoto, idSize, tattooColor, tattooBN, cost, estimated },
    { new: true }
  ).exec();
};

module.exports = { get, create, getById, create, update };
