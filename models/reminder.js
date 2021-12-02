const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
     remimder:{
         type:String,
         minlenght:1,
         required: true,
     }
});

module.exports={
    model:mongoose.model("Reminder",schema),
    schema,
};