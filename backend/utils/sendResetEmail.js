const nodemailer = require('nodemailer');

const sendResetEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'sharelifegiveblood098@gmail.com',
      pass: 'hoxxdnewuubocfrb' // Use App Password for security
    }
  });

  const mailOptions = {
    from: 'Share Life,Give Blood <sharelifegiveblood098@gmail.com>',
    to,
    subject: 'Reset Your Password',
    html: `
      <h3>Password Reset Request</h3>
      <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
      <a href="${resetLink}">${resetLink}</a>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendResetEmail;
