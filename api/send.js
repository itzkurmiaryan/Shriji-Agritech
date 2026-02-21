const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ARYANMURADPUR2008@GMAIL.COM', // Gmail
      pass: 'WLMPFSUZBHLRIDSA',    // Gmail App Password
    },
  });

  let mailOptions = {
    from: email,
    to: 'YOUR_GMAIL@gmail.com',
    subject: `New Contact Message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Contact email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Contact email sending failed.' });
  }
});

module.exports = router;