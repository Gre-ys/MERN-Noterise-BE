const nodemailer = require("nodemailer");

const sendEmail = async (target, subject, message) => {
  // Create Transporter
  const Transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD_EMAIL,
    },
  });

  // Create Options
  const options = {
    from: `Slink<${process.env.EMAIL}>`,
    to: target,
    subject: subject,
    html: message,
  };

  try {
    await Transporter.sendMail(options);
    return true;
  } catch (error) {
    throw new Error("Failed To Send Email!");
  }
};

module.exports = sendEmail;
