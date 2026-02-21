import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ success: false });

  const { name, phone, email, product, quantity, address, district, state, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"Website Order" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order - Shri Ji AgriTech",
      html: `<p>Name: ${name}</p>
             <p>Phone: ${phone}</p>
             <p>Email: ${email}</p>
             <p>Product: ${product}</p>
             <p>Quantity: ${quantity}</p>
             <p>Address: ${address}</p>
             <p>District: ${district}</p>
             <p>State: ${state}</p>
             <p>Message: ${message}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}