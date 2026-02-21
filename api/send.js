import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    try {
      await transporter.sendMail({
        from: `"Website Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `New Message from ${name}`,
        html: `<h3>Contact Form Submission</h3>
               <p><b>Name:</b> ${name}</p>
               <p><b>Email:</b> ${email}</p>
               <p><b>Message:</b> ${message}</p>`
      });

      res.status(200).json({ success: true });
    } catch (err) {
      console.error("Send Error:", err);
      res.status(500).json({ success: false, error: err.message });
    }
  } else {
    res.status(405).end("Method Not Allowed");
  }
}