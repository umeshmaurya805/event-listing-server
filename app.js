const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const app = express();
const PORT = process.env.PORT || 8000;
mongoose
  .connect(
    "mongodb+srv://umeshmaurya805:mauryakbc@cluster0.kjj6w.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => console.log("Connected to DB!"))
  .catch((error) => console.log(error.message));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./uploads'))
app.use('/api/', require('./routes/events'));

app.listen(PORT, () => {
    console.log(`App is listenting at port ${PORT}`)
})