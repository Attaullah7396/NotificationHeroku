var path = require("path");
var express = require("express");
var cors = require('cors');
var app = express();

var publicDirPath = path.resolve(__dirname, "www");
app.use(express.static(publicDirPath));
app.use(cors());

var sid = "ACf2d28794aa7e17939b16133113518409";
var token = "3d8b88787cf7d13597718c83108d88c8";


var authy = require('authy')("YBDqeRMkefWP7lSWkv0WR2ors33XJvJe");
var twilioClient = require('twilio')(sid, token);


app.get("*", function (req, res) {
    res.sendFile(publicDirPath + "/index.html");
});

app.post('/sendSms', function (req, res) {
    twilioClient.sendMessage({
        to: req.body.phone,
        from: "+12052368776",
        body: "Welcome to Notification App, Your verification code is " + req.body.code
    }, function (err, response) {
        if (err) {
            res.send("error")
        } else {
            res.send(response)
        }
    });

});

// from: "+12052368776",

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("App started on port")
});
