const tatooStudio = require("../../models/tatooStudio").model;

const create = async (studioData) => {
    const {name,description,licenseImage,phone,social} = studioData;
    const studio = new Studio({id_user,name,description,licenseImage,phone,social});
    const savedStudio = await studio.save();
    return  savedStudio
}