import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, phone, email, product, quantity, address, district, state, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      await transporter.sendMail({
        from: `"Website Order" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `🛒 New Order - Shri Ji AgriTech`,
        html: `<h2>New Order Received</h2>
               <p><b>Name:</b> ${name}</p>
               <p><b>Phone:</b> ${phone}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Product:</b> ${product}</p>
               <p><b>Quantity:</b> ${quantity}</p>
               <p><b>Address:</b> ${address}</p>
               <p><b>District:</b> ${district}</p>
               <p><b>State:</b> ${state}</p>
               <p><b>Message:</b> ${message}</p>`
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Order Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}