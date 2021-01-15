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
    datetime: {
        type: Date,
        // required:true,

    },
    organiser: {
        type:String,
    },
    image: {
        type: String,
        required:true,

    },
 
});
 
module.exports = mongoose.model("Event", EventSchema);