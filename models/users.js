const mongoose =require("mongoose");
               require('mongoose-type-email');
const Schema = mongoose.Schema;

const schema = new Schema({
    id_role:{
        type:Schema.ObjectId,
        ref:"Rol",
        required:true,
    },
    name:{
        type: String,
        trim: true,
        maxlenght:20,
        minlenght: 1,
        required: true,
    },
    lastName:{
        type: String,
        trim: true,
        maxlenght:20,
        minlenght: 1,
        required: true,
    },
    email:{
        work: {type: mongoose.SchemaTypes.Email, required: true},
        unique:true,
    },
    phoneHome:{
        type: String,
        trim: true,
        maxlenght:10,
        minlenght: 1,
        required: true,
    },
    phonePersonal:{
        type: String,
        trim: true,
        maxlenght:10,
        minlenght: 1,
        required: true,
    },
    curp:{
        type: String,
        trim: true,
        maxlenght:18,
        minlenght: 1,
      },
    rfc:{
        type: String,
        trim: true,
        maxlenght:13,
        minlenght:1,
    },
    userName:{
        type: String,
        required: true,
        trim: true,
        maxlenght:50,
        minlenght: 1,
        unique:true,
    },
    password:{
        type: String,
        required: true,
        minlenght:1,
    },
    status:Boolean,
});
module.exports= {
    model:mongoose.model("User",schema),
    schema,
};