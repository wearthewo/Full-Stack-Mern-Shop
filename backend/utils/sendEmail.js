import nodemailer from "nodemailer";
export const sendEmail = async (to, subject, text) => {
  // Create a fake SMTP account
  const testAccount = await nodemailer.createTestAccount();

  // Create transporter
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: testAccount.user, // auto-generated ethereal user
      pass: testAccount.pass, // auto-generated ethereal password
    },
  });

  // Email details
  const mailOptions = {
    from: '"My Shop" <no-reply@myshop.com>', // anything you want
    to,
    subject,
    text,
  };

  // Send email
  const info = await transporter.sendMail(mailOptions);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info)); // <-- Important!

  return info;
};
