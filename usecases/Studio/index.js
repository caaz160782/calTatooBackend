const tatooStudio =require("../../models/tatooStudio").model;

// Crear estudio
const create = async (studioData) => {
    const {name,description,licenseImage,phone,social} = studioData;
    const studio = new Studio({id_user,name,description,licenseImage,phone,social});
    const savedStudio = await studio.save();
    return  savedStudio;
}
// Ver estudios
const get =async() =>{
    const allStudio= await User.find({}).exec();
    return allStudio;
}
// Modificar info de estudios
const update =async (studioId, studioData) =>{
    const{name,description,licenseImage,phone,social} =studioData;
    return Post.findbyIdandUpdate(studioId,{name,description,licenseImage,phone,social}).exec();
}



module.exports = {create,get,update}