const express = require("express")
const appRoute = require('./routes/route.js')
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())
app.use('/api', appRoute);


module.exports = app;


app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port 4000`);
})

