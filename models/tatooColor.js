const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
     description:{
         type:String,
         minlenght:1,
         required: true,
     }
});

module.exports={
    model:mongoose.model("TatooColor",schema),
    schema,
};