var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cookie = require("cookie-parser");
var cors = require('cors');
var app = express();

console.log("Hello world");

var publicDirPath = path.resolve(__dirname, "www");
app.use(express.static(publicDirPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(logger("dev"));
app.use(cookie());
app.use(cors());

var sid = "ACf2d28794aa7e17939b16133113518409";
var token = "3d8b88787cf7d13597718c83108d88c8";


var authy = require('authy')("YBDqeRMkefWP7lSWkv0WR2ors33XJvJe");
var twilioClient = require('twilio')(sid, token);


app.get("*", function (req, res) {
 res.sendFile(publicDirPath + "/index.html");
 });

app.post('/sendSms', function (req, res) {
  /*var accountSid = 'ACf2d28794aa7e17939b16133113518409';
  var authToken = "your_auth_token";
  var client = require('twilio')(accountSid, authToken);*/

  /*twilioClient.outgoingCallerIds("PNe905d7e6b410746a0fb08c57e5a186f3").get(function(err, callerId) {
    console.log(callerId.phoneNumber);
  });*/


 /* authy.register_user(req.body.email, req.body.phone, req.body.countryCode,
    function(err, res) {
      if(res){
        console.log("user registered");
        //var authId = res.user.id;
        console.log(res);
        console.log(res.user.id);
      }else{
        console.log("error");
        console.log(err);
        response.send("error");
      }
    });*/

  console.log("req i");
  console.log(req.body.phone);

  twilioClient.sendMessage({
    to: req.body.phone,
    from: "+12052368776",
    body: "Welcome to Notification App, Your verification code is "+ req.body.code
  }, function (err, response) {
    if(err){
      console.log("error");
      console.log(err);
      res.send("error")
    }else{
      console.log("success");
      res.send(response)
    }
  });

});
app.post('/recover', function (req, res) {
  console.log("Recover chal para");

  twilioClient.sendMessage({
    to: req.body.phone,
    from: "+12052368776",
    body: "Hello from Notification App, Enter this code "+ req.body.code +" to recover your account"
  }, function (err, response) {
    if(err){
      console.log("error");
      console.log(err);
      res.send("error")
    }else{
      console.log("success");
      res.send(response)
    }
  });

});


app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
    console.log("App started on port")
});
