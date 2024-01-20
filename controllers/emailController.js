import dotenv from "dotenv";
import asyncHandler from "express-async-handler";
import { createTransport } from "nodemailer";

dotenv.config();

export const sendEmail = asyncHandler(async (req, res) => {
  const token = req.headers["authtoken"];

  if (!token || token !== process.env.TOKEN) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const { emailId, messageAndSubject } = req.body;

  if (!emailId) {
    return res.status(400).json({ error: "Please provide emailId" });
  }

  if (!messageAndSubject) {
    return res.status(400).json({ error: "Please provide messageAndSubject" });
  }

  try {
    console.log("Sending Email using nodemailer");
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: emailId,
      subject: messageAndSubject.subject,
      text: messageAndSubject.message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ error: error });
      } else {
        console.log(`Verification Email send to ${emailId}`);
        return res.status(200).json({ success: true });
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
});
