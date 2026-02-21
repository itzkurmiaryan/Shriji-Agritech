const nodemailer = require("nodemailer");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const {
    name,
    phone,
    email,
    product,
    quantity,
    address,
    district,
    state,
    message,
  } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Order" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order - Shri Ji AgriTech",
      html: `
        <h2>New Order Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Product:</b> ${product}</p>
        <p><b>Quantity:</b> ${quantity}</p>
        <p><b>Address:</b> ${address}</p>
        <p><b>District:</b> ${district}</p>
        <p><b>State:</b> ${state}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};