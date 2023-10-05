import nodemailer, { Transporter } from "nodemailer";

interface EmailOptions {
    to: string;
    subject: string;
    text: string;
}

export const sendEmail = (options: EmailOptions): void => {
    const transporter: Transporter = nodemailer.createTransport({
        host: process.env.HOST as string,
        auth: {
            user: process.env.EMAIL_USERNAME as string,
            pass: process.env.EMAIL_PASSWORD as string,
        },
    });

    const mailOptions = {
        from: process.env.FROM_EMAIL as string,
        to: options.to,
        subject: options.subject,
        html: options.text,
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err);
        } else {
            console.log(info);
        }
    });
};
