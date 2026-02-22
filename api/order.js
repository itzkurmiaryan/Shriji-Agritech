import nodemailer from "nodemailer";

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { name, email, phone, product, quantity, address, district, state, message } = req.body;

  if (!name || !email || !phone || !product || !quantity || !address || !district || !state) {
    return res.status(400).json({ success: false, message: "All fields required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_RECEIVER,
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
Message: ${message || "N/A"}
      `,
    });

    return res.status(200).json({ success: true });

  } catch (error) {
    console.error("Order Email Error:", error);
    return res.status(500).json({ success: false, message: "Email failed" });
  }
}