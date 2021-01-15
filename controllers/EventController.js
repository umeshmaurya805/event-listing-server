const Event=require('../models/Event')
const addEvent = async (req, res) => {
    try {
        const { name, description,datetime,organiser } = req.body;
        console.log(req.file)
        console.log("environemtnt", process.env.NodeEnv)
        
        if(process.env.NodeEnv!=="production")
           var  image = `http://localhost:8000/uploads/${req.file.originalname}`
        else
           var image = `https://event-listing-server.herokuapp.com/${req.file.originalname}`
        const events = await new Event({ name, description, datetime, organiser, image }).save();
        console.log(events)
        if (events)
             res.status(200).json('Added successfully');
    } catch (error) {
        console.log(error)
    }
}

const allEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        if (events)
         res.status(200).json(events);
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    allEvents,addEvent
}