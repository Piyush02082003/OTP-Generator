const nodemailer = require("nodemailer");

async function mailSender(email, title, body) {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bansalpiyush833@gmail.com",
        pass: "sfjb djdf tfpl xopw",
      },
    });

    let mailOptions = {
      from: "bansalpiyush833@gmail.com",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return info;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = { mailSender };
