import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import connectDb from "@/libs/mongodb";
import UserModel from "@/models/User.model";
import { sendEmail } from "@/helpers/sendMail";

connectDb();

export default async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === "POST") {
            const { email } = req.body;

            const user = await UserModel.findOne({ email });

            if (!user) {
                res.status(404).json({ message: "Email not found" });
                return;
            }

            const secret_key = process.env.NEXTAUTH_SECRET;
            const token = jwt.sign({ _id: user._id }, secret_key!, {
                expiresIn: "24h",
            });

            user.resetToken = token;
            await user.save();

            const link = `${process.env.NEXTAUTH_URL}reset-password?token=${token}`;

            const message = `<div><h2 style={{ textAlign: "center"}}>Forgot your password?</h2><p>Click on the link below to reset your password, if the link is not working then please paste into the browser.</p></div></br>
      <div><a href=${link} style={{ cursor: 'pointer', fontFamily: 'Poppins', color: '#3e79f7'}}>${link} </a></div>`;

            await sendEmail({
                to: user.email,
                subject: "Reset Password",
                text: message,
            });

            return res.status(200).json({
                message: `Email sent to ${user.email}, please check your email`,
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
