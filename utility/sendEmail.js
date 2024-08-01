<<<<<<< HEAD
const nodemailer = require("nodemailer");

class SendEmail {
  constructor(url, resetToken, user) {
    this.url = url;
    this.user = user;
    this.resetToken = resetToken;
  }

  async Sendmail() {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465 || process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: "jomlaa.shp@gmail.com", // Replace with your email
        pass: "murw jcjk avrc ckpe", // Replace with your email password
      },
    });
    // Email options
    let link = "";
    if (this.user.role === "admin") {
      link = `http://localhost:5174/reset-password/${this.resetToken}`;
    } else {
      link = `http://localhost:5173/reset-password/${this.resetToken}`;
    }
    let mailOptions = {
      from: "jomlaa.shp@gmail.com", // Sender address
      to: `${this.user.email}`, // List of recipients
      subject: "reset your account password", // Subject line
      html: `<p>hello ${this.user.firstName} if you are forgot your password or lost it please use the link below to reset your password <br>
      <a href=${link}>reset your password</a>
      </p>`,
      // <span>${this.resetToken}</span>
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }
}

module.exports = SendEmail;
=======
const nodemailer = require("nodemailer");

class SendEmail {
  constructor(url, resetToken, user) {
    this.url = url;
    this.user = user;
    this.resetToken = resetToken;
  }

  async Sendmail() {
    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465||process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: "jomlaa.shp@gmail.com", // Replace with your email
        pass: "murw jcjk avrc ckpe", // Replace with your email password
      },
    });
    // Email options
    let link = "";
    if (this.user.role === "admin") {
      link = `http://localhost:5174/reset-password/${this.resetToken}`;
    } else {
      link = `http://localhost:5173/reset-password/${this.resetToken}`;
    }
    let mailOptions = {
      from: "jomlaa.shp@gmail.com", // Sender address
      to: `${this.user.email}`, // List of recipients
      subject: "reset your account password", // Subject line
      html: `<p>hello ${this.user.firstName} if you are forgot your password or lost it please use the link below to reset your password <br>
      <a href=${link}>reset your password</a>
      </p>`,
      // <span>${this.resetToken}</span>
    };

    // Send email
    await transporter.sendMail(mailOptions);
  }
}

module.exports = SendEmail;
>>>>>>> 0212859 (first commit)
