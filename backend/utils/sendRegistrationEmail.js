const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (to, subject, html) => {
  if (process.env.SEND_EMAIL !== "true") {
    console.log("📭 Email sending is disabled by SEND_EMAIL flag.");
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Share Life, Give Blood" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("📧 Email sent to:", to);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
  }
};

module.exports = sendMail;