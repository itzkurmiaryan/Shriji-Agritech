import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const {
    name, phone, email, product, quantity,
    address, district, state, message
  } = req.body;

  if (!name || !phone || !product || !quantity || !address || !district || !state) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `${name} <${email || process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Order from ${name}`,
      text: `
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Product: ${product}
        Quantity: ${quantity}
        Address: ${address}
        District: ${district}
        State: ${state}
        Additional Message: ${message || "N/A"}
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}