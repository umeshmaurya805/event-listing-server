const Event=require('../models/Event')

const addEvent = async (req, res) => {
    try {
        const { name, description, date, peopleCount } = req.body;
        console.log(req.file)
        const image=`http://localhost:8000/uploads/${req.filename}`
        const events = await new Event({ name, description, date, peopleCount, image }).save();
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