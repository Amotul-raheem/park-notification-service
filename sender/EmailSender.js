import nodemailer from "nodemailer"
import dotenv from "dotenv"

dotenv.config()

// https://www.w3schools.com/nodejs/nodejs_email.asp
const sendMail = (recipients, content, subject) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SENDER_SERVICE,
        auth: {
            user: process.env.AUTH_USER,
            pass: process.env.AUTH_PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.AUTH_USER,
        to: recipients,
        subject: subject,
        html: content
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            throw new error("Email Failed to send", error)
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

export default sendMail;