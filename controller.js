const {Contacts} = require('./contact')
const dotenv = require('dotenv').config();
const nodemailer = require('nodemailer');

exports.getContacts = async (req,res) => {
  try{
    const contacts = Contacts;
    res.status(200).json({
      message: "All Contacts",
      contacts: contacts,
    });
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}

exports.sendContact =  async (req, res) => {
  try{
    const {name, email, phone, message} = await req.body;
    const output = {
      name,
      email,
      phone,
      message
    }
    Contacts.push(output);

    const mail = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `
    // Create Transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    });

    // Mail Options To Website Owner
    let mailOptions = {
      from: 'omosiyobo@gmail.com', //Sender address
      to: 'omosiyobo@gmail.com', // Receiver address
      subject: 'Nodemailer Project',
      text: 'Hi from your nodemailer project',
      html: mail
    };

    transporter.sendMail(mailOptions, function(err, data) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Email sent successfully");
        console.log(data);
      }
    });

     // Mail Options To Website User
     let mailOptions2 = {
      from: 'omosiyobo@gmail.com', //Sender address
      to: `${req.body.email}`, // Receiver address
      subject: 'Nodemailer Project',
      text: 'Hi from your nodemailer project',
      html: `<h4>Your Message Has Been Received</h4>`
    };

    transporter.sendMail(mailOptions2, function(err, data) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Email sent successfully");
        console.log(data);
      }
    });

    res.status(201).json({
      message: "Message sent",
      output
    })
  } catch (err) {
    console.log({message: err.message});
    res.status(500);
  }
}
