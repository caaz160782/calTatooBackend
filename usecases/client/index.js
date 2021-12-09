const Client = require ("../../models/users").model;

//listar  clientes
const  get =async() =>{    
    const allClient= await Client.find({}).exec();
    return allClient;
}

//ver los detalles de cliente  id
const getById = async (clientId)=>{
    const client= await Client.findById(clientId).exec();
    return client;
}
//crear cliente
const create = async (clientData) => {
    const {name, lastName,email,phonePersonal} =  clientData;          
    const  client = new Client({name, lastName, email, phonePersonal, age, socialNetwork,picture});
    const  savedClient= await client.save();
    return savedClient;
};
//eliminar
const del = (clientId)=>{
    return Client.findByIdAndDelete(clientId).exec();
};
//modificar
const update =async (clientId,clientData) =>{
    const{name, lastName,phonePersonal} = clientData;  
    return Client.findByIdAndUpdate(clientId,
        {name,lastName,phonePersonal},{new: true}).exec() ;
};

module.exports = {get, getById,create,del,update}