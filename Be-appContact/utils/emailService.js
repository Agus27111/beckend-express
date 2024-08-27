const nodemailer = require("nodemailer");
require("dotenv").config();

const base_url = process.env.BASE_URL;

const transporter = nodemailer.createTransport({
  host: "smtp.mailgun.org",
  port: 587,
  auth: {
    user: "postmaster@sandbox5ba2138e1aa947afbb74f57fd8155ed9.mailgun.org",
    pass: process.env.MAILGUN_API_KEY,
  },
});

const createEmail = (email, token) => {
  return {
    from: process.env.MAIL_FROM,
    to: email,
    subject: "Aktivasi Akun Anda",
    html: `<p>Selamat datang! Untuk mengaktifkan akun Anda, silakan klik link berikut ini: </p>
    <a href="${base_url}/activate?token=${token}">Aktivasi Akun</a>`,
  };
};
const sendMail = (email, token) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(createEmail(email, token), (err, info) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log("email sent: " + info.response);
        resolve(true);
      }
    });
  });
};

module.exports = { sendMail };
