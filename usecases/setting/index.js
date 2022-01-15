const Setting = require("../../models/setting").model;

const create = async (settingData) => {
  const {
    id_tatoostudios,
    logo,
    timeToOpen,
    timeToClose,
    dayNotAvailables,
    notifications,
  } = settingData;
  const settingStudio = new Setting({
    id_tatoostudios,
    logo,
    timeToOpen,
    timeToClose,
    dayNotAvailables,
    notifications,
  });
  const createdSettingStudio = await settingStudio.save();
  return createdSettingStudio;
};

const getById = async (idSetting) => {
  const setting = await Setting.findById(idSetting).exec();
  return setting;
};

const getByStudio = async (idStudio) => {
  const settinStudi = await Setting.findOne({ id_tatoostudios: idStudio })
    .populate("id_tatoostudios", ["name"])
    .where("id_tatoostudios")
    .equals(idStudio);
  return settinStudi;
};

const update = async (settingId, settingData) => {
  const { logo, timeToOpen, timeToClose, dayNotAvailables, notifications } =
    settingData;
  return Setting.findByIdAndUpdate(
    settingId,
    {
      logo,
      timeToOpen,
      timeToClose,
      dayNotAvailables,
      notifications,
    },
    { new: true }
  ).exec();
};

module.exports = { create, getById, getByStudio, update };
