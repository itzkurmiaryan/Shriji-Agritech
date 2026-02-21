const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/order', async (req, res) => {
  const { name, email, phone, product, quantity, address, district, state, message } = req.body;

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
Message: ${message}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Order email sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Order email sending failed.' });
  }
});

module.exports = router;