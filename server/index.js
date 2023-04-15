const express = require("express")
const appRoute = require('./routes/route.js')
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require('path')
const { log } = require("console")


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

app.use('/api', appRoute);
const _dirname = path.dirname("")
console.log(_dirname);
const buildPath = path.join(_dirname, "../barbershop-payment-system/build");
console.log(buildPath);
app.use(express.static(buildPath))

app.get("*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../barbershop-payment-system/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );

})




module.exports = app;



app.listen(process.env.PORT || 4000, () => {
    console.log(`Server is listening on port 4000`);
})

