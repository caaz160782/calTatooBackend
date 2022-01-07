const Client = require ("../../models/users").model;
const hash = require("../../lib/crypt");

//listar  clientes
const  get =async() =>{    
    const allClient= await Client.find({})
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbeeca3143f1d4146eec10")
    .exec();
    return allClient;
}

//ver los detalles de cliente  id
const getById = async (clientId)=>{
    const client= await Client.findById(clientId)
    .populate("idRole", ["rol"])
    .where("idRole")
    .equals("61bbeeca3143f1d4146eec10")
    .exec();
    return client;
}
//crear cliente
const create = async (clientData) => {
    const {name, lastName,email,phonePersonal,age,idRole,password,socialNetwork,picture} =  clientData;
    const pswHash = await hash.hashPassword(password);
    const  client = new Client({name, lastName, email, phonePersonal, age,password: pswHash,idRole, socialNetwork,picture});
    const  savedClient= await client.save();
    return savedClient;
};
//eliminar
const del = (clientId)=>{
    return Client.findByIdAndDelete(clientId).exec();
};
//modificar
const update =async (clientId,clientData) =>{
    const{name, lastName,email,phonePersonal,age,idRole,password,socialNetwork,picture} = clientData;  
    return Client.findByIdAndUpdate(clientId,
        {name, lastName,email,phonePersonal,age,idRole,password,socialNetwork,picture},{new: true}).exec() ;
};

module.exports = {get, getById,create,del,update}