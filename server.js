const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Test transporter
transporter.verify((err, success) => {
  if (err) console.log("Transporter Error:", err);
  else console.log("Email server ready!");
});

// ====== Contact Route ======
app.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message)
    return res.status(400).json({ success: false, message: "All fields are required." });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_RECEIVER,
    subject: `New Contact Message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Contact email sent successfully!' });
  } catch (err) {
    console.error("SendMail Error:", err);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

// ====== Order Route ======
app.post('/order', async (req, res) => {
  const { name, email, phone, product, quantity, address, district, state, message } = req.body;

  if (!name || !email || !phone || !product || !quantity || !address || !district || !state)
    return res.status(400).json({ success: false, message: "All fields are required." });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_RECEIVER,
    subject: `New Order from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Product: ${product}
Quantity: ${quantity}
Address: ${address}
District: ${district}
State: ${state}
Message: ${message || 'N/A'}
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Order email sent successfully!' });
  } catch (err) {
    console.error("SendMail Error:", err);
    res.status(500).json({ success: false, message: 'Failed to send order email.' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});