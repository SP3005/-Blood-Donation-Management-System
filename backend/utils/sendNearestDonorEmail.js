// utils/sendEmailNotification.js
const nodemailer = require('nodemailer');

const sendEmailNotification = async (emails, bloodgroup, location, phone) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password'
    }
  });

  const mailOptions = {
    from: 'your_email@gmail.com',
    to: emails,
    subject: `Urgent Need for ${bloodgroup} Blood in ${location}`,
    html: `
      <p>Hello Donor,</p>
      <p>There is an urgent requirement for <strong>${bloodgroup}</strong> blood in <strong>${location}</strong>.</p>
      <p>Contact Info: <strong>${phone}</strong></p>
      <p>If you're available, please login and respond on the platform.</p>
      <p>Thank you for being a life-saver!</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Emails sent successfully.');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
};

module.exports = sendEmailNotification;
