const Setting = require("../../models/setting").model;

const create = async (settingData) => {
  const {
    id_tatoostudios,
    logo,
    timeToOpen,
    timeToClose,
    dayAvailables,
    notifications,
  } = settingData;
  const settingStudio = new Setting({
    id_tatoostudios,
    logo,
    timeToOpen,
    timeToClose,
    dayAvailables,
    notifications,
  });
  const createdSettingStudio = await settingStudio.save();
  return createdSettingStudio;
};

const getById = async (idSetting) => {
  const setting = await Setting.findById(idSetting).exec();
  return setting;
};

const update = async (settingId, settingData) => {
  const { logo, timeToOpen, timeToClose, dayAvailables, notifications } =
    settingData;

  return Setting.findByIdAndUpdate(
    settingId,
    {
      logo,
      timeToOpen,
      timeToClose,
      dayAvailables,
      notifications,
    },
    { new: true }
  ).exec();
};

module.exports = { create, getById, update };
