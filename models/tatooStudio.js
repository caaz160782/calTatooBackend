const mongoose = require("mongoose");
const Schema= mongoose.Schema;

const schema = new Schema({
    id_user:{
        type:Schema.ObjectId,
        ref:"User",
        required:true,
    },
   name:{
    type: String,
    trim: true,
    maxlenght:20,
    minlenght: 1,
    required: true,
   },
   description:{
    type: String,
    trim: true,
    maxlenght:100,
    minlenght: 1,
    required: true,
   },
   licenseImage:{
    type: String,
    trim: true,
    maxlenght:100,
    minlenght: 1,
   },
   /*postalCode:{},
   municipality:{},
   state:{},
   city:{},*/
   phone :{
    type: String,
    trim: true,
    maxlenght:10,
    minlenght: 1,
    required: true,
   },
   social:{
    type: Array,
    required: false,
   },
});

module.exports={
    model:mongoose.model("TatooStudio",schema),
    schema,
};