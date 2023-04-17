const otpGenerator = require("otp-generator");
const userModel = require("../model/user");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const passOutlook = process.env.PASSWORD;
let jwt = require("jsonwebtoken");
const saltRounds = 10;
const forgetPassword = async (req, res) => {

  try {
    let email = req.body.email;
  
    let data = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });
  
    const findEmail = await userModel.findOne({ email: email });
  
    if (!findEmail)
      return res.status(404).send({ status: false, message: "no email found" });
  
    let mailTransporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: "vinti9876@outlook.com",
        pass: passOutlook,
      },
    });
  
    const mailOptions = {
      from: "vinti9876@outlook.com",
      to: email,
      subject: "Otp for password change",
      text: `Hi
  
          Your One Time Password (OTP) is ${data}
          
           
          If you have not made this request, please contact our customer support immediately.`,
    };
  
    mailTransporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error Occurs");
      } else {
        console.log("Email sent successfully");
      }
    });
  
    return res.status(200).send({ status: true, message: data });
  } catch (error) {
    return res.status(500).send({status:false, message:error.message})
  }
};

const updateForgetPassword = async (req, res) => {
try {
    let password = req.body.password;
    let email = req.body.email;
    
    let encryptPassword = await bcrypt.hash(password, saltRounds);
    await userModel.findOneAndUpdate(
      { email: email },
      { password: encryptPassword }
    );
    return res
      .status(200)
      .send({ status: true, message: "data updated successfully" });
} catch (error) {
  return res.status(500).send({status:false, message:error.message})
}
};

module.exports = { forgetPassword, updateForgetPassword };
