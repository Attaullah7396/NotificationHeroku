var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cookie = require("cookie-parser");
var cors = require('cors');
var app = express();
var ionicPushServer = require('ionic-push-server');


var credentials = {
    IonicApplicationID : "e772a91c",
    IonicApplicationAPItoken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0YjAxMjBlNS04YWYwLTQwNGUtYTUwOS1iODQ2NThmODEzMzQifQ.TZShhMQzR_lT9SzkQ9bAmlX8Cgu59joLAtI8X1DWj4o"
};



var publicDirPath = path.resolve(__dirname, "www");
app.use(express.static(publicDirPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));
app.use(cookie());
app.use(cors());

var sid = "AC2fc91459e998502a55665c28f6db97e7";
var token = "c8b3cdeb088790434e45237529224827";


var authy = require('authy')("YBDqeRMkefWP7lSWkv0WR2ors33XJvJe");
var twilioClient = require('twilio')(sid, token);


app.get("*", function (req, res) {
    res.sendFile(publicDirPath + "/index.html");
});

app.post('/sendSms', function (req, res) {
    twilioClient.sendMessage({
        to: req.body.phone,
        from: "+18664182126",
        body: "Welcome to Faisal Zubair Vohra Notification App, Your verification code is " + req.body.code
    }, function (err, response) {
        if (err) {
            res.send("error")
        } else {
            res.send(response)
        }
    });

});


app.post('/notify', function (req, res) {
    console.log("request aa gae");
    var notification = {
        //"tokens": ["emt9fvLy8rY:APA91bEXEHXLwf3PTz3RnVb6pUsvZqTs66qn6A3gniqUZ17YsUpredx4Ik2PzAPZA8NrdK23p-QKTUq9IntJDYL-nw85Fi94K9BnoY7_2JoknwqIFA1Wo9ZUaRrvjuQO2gBp9hIt6G98"],
        "tokens": req.body.tokenList,
        "profile": "my_security_profile",
        "notification": {
            "title": "New post added",
            "message": req.body.postData,
            "android": {
                "title": "New post added",
                "message": req.body.postData
            },
            "ios": {
                "title": "New post added",
                "message": req.body.postData
            }
        }
    };

    ionicPushServer(credentials, notification);

});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log("App started on port")
});
