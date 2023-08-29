const express = require("express");
const app = express();
const port = 19027;
const bodyParser = require('body-parser');
const morgan = require("morgan");


app.use(morgan("tiny"));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

global.data = {};

app.get(/(tunnel)?/g, function (req, res, next) {
    res.json(global.data);
});

app.post("/tunnel", function (req, res, next) {
    console.log(req.body);
    global.data = req.body;
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log("App running on port: %s", port);
});
