const mongoose = require("mongoose");
const Schema= moongoose.Schema;

const schema= new Schema({
    idDate:{
        type:Schema.ObjectId,
        ref:"Date",
        required:true,
    },
    idUser:{
        type:Schema.ObjectId,
        ref:"User",
        required:true,
    },
    idSize:{
        type:Schema.ObjectId,
        ref:"size",
        required:true,
    },
    idSize:{
        type:Schema.ObjectId,
        ref:"TatooColor",
        required:true,
    },
    description:{
        type:String,
        minlenght:1,
        required: true,
    },
    desPhoto:{
        type:String,
        minlenght:1,
        required: true,
    },
    cost:{
        type:Number,
        required: true,
    },
    estimated:{
        type:Number,
        required: true,
    }
})
module.exports={
    model: mongoose.model("TatooInfo",schema),
    schema
}