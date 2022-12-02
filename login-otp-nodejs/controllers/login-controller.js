"use strict";
const bcrypt = require("bcrypt");
const firebase = require("../db");
const firestore = firebase.firestore();
const otpGenerator = require("otp-generator");
var http = require('http');
var https = require('https');
const ACCESS_TOKEN = "f7ryj4LxjXK5__DlNzE_e8MvyhBeRyEe";

const sendSMS = function(phones, content, type, sender) {
  var url = 'api.speedsms.vn';
  var params = JSON.stringify({
      to: phones,
      content: content,
      sms_type: type,
      sender: sender
  });

  var buf = new Buffer.from(ACCESS_TOKEN + ':x');
  var auth = "Basic " + buf.toString('base64');
  const options = {
      hostname: url,
      port: 443,
      path: '/index.php/sms/send',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
      }
  };

  const req = https.request(options, function(res) {
      res.setEncoding('utf8');
      var body = '';
      res.on('data', function(d) {
          body += d;
      });
      res.on('end', function() {
          var json = JSON.parse(body);
          if (json.status == 'success') {
              console.log("send sms success")
          }
          else {
              console.log("send sms failed " + body);
          }
      });
  });

  req.on('error', function(e) {
      console.log("send sms failed: " + e);
  });

  req.write(params);
  req.end();
}
const createNewAccessCode = async (req, res, next) => {
  try {
    const id = req.body.phone;
    const OTP = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const data = {
      phone: id,
      otp: OTP,
    };
    await firestore.collection("login").doc(id).set(data);
    sendSMS(id, `Your OTP for login is ${OTP}`, "report", 'f10b48043a3d954b');
    res.send(`Record saved successfuly `);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const validateAccessCode = async (req, res, next) => {
  try {
    const id = req.body.phone;
    const phone = await firestore.collection("login").doc(id);
    const data = await phone.get();
    const dataChange = {
      phone: id,
      otp: '',
    };
    if (data.data().otp === req.body.otp && req.body.otp.match("[0-9]{6}")) {
      phone.set(dataChange);
      return res.status(200).send("User Registration Successfull!");
    } else {
      return res.status(400).send("Your OTP was wrong!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};


module.exports = {
  createNewAccessCode,
  validateAccessCode,
};
