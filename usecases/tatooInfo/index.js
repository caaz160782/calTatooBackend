const InfoTattoo = require("../../models/tatooInfo").model;

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
module.exports = { create };
