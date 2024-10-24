const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const placeSchema =  new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    image:{
        url:String,
        },
    price:{
        type:Number,
    },
    location:{
        type:String
    },
    country:{
        type:String,
    }
});

const placeList = new mongoose.model("placeList",placeSchema);

module.exports = placeList;