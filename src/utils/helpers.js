//src/utils/helpers.js
import nodemailer from "nodemailer";

export const sendEmailOTP = async (email, subject) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const message = `Your OTP is: ${otp}`;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    text: message, // plain text
  });

  return otp;
};
