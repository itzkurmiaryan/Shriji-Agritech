const nodemailer = require("nodemailer");

module.exports = async (req, res) => {

  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Website Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `New Contact from ${name}`,
      html: `
        <h3>New Contact Message</h3>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br>${message}</p>
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false });
  }
};