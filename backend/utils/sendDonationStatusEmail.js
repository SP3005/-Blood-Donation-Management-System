const nodemailer = require('nodemailer');

const sendStatusEmail = async (to, name, status) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const subject = `Blood Donation Request ${status}`;
  const message = `
    Hello ${name},

    Your blood donation request has been ${status.toLowerCase()}.

    Thank you for supporting the cause.

    - Share Life, Give Blood Team
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: message
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendStatusEmail;
