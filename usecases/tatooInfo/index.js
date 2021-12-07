const InfoTattoo = require("../../models/tatooInfo").model;

const get =async() =>{
  const allDates= await InfoTattoo.find({}).exec();
  return allDates;
}

//ver los detalles de usurio id
const getById = async (dateId)=>{
  const date= await InfoTattoo.findById(userId).exec();
  return date;
}


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



module.exports = { get,create };
