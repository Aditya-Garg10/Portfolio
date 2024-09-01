const Admin = require("../models/UserModel")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

const express = require("express")



const adminLogin =(async(req,res)=>{
    try {
      const {email,password} = req.body;
      let user = await Admin.findOne({email});
      if (!user) {
        success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials (email)" });
      }   
      
      const passwordCompare = password === user.password
      if(!passwordCompare){
          success = false
        return res.status(400).json({ success, error: "Please try to login with correct credentials (password)" });
      }
  
      const data = {
          user: {
            id: user.id
          }
        }
  
        const authtoken = jwt.sign(data, 'secrem_admin1');
        success = true;
        res.status(200).send({ success, authtoken })
    } catch (error) {
      res.status(500).send("Internal Server Error")
    }
  })


const Sendemail = (async(req, res) => {
  try {
    
  const {  email, message } = req.body;
  console.log(req.body)
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: process.env.email, // Replace with your email
          pass: process.env.Password,  // Replace with your email password
      },
  });

  console.log(process.env.email)
  // Mail options
  const mailOptions = {
      from: email,
      to: "gargaditya880@gmail.com", // Replace with recipient's email
      subject: `Message from ${email} from Portfolio`,
      text: message,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          // return res.status(500).json({ error: 'Failed to send email' });
          console.log(error)
      }
      else{
        console.log(info.response)
        res.status(200).json({ success: 'Email sent successfully' });
      }
  });
  } catch (error) {
    console.log(error)
  }
});



  module.exports = {adminLogin,Sendemail}