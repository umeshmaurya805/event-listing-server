var mongoose = require("mongoose");
 
var EventSchema = new mongoose.Schema({
    name: {
        type: String,
        // required:true,
    },
    description: {
        type: String,
        // required:true,

    },
    date: {
        type: Date,
        // required:true,

    },
    time: {
        type:String,
    },
    venue: {
        type:String
    },
    image: {
        type: String,
        required:true,

    },
    peopleCount: {
        type: Number, 
        // required:true,

    }
});
 
module.exports = mongoose.model("Event", EventSchema);