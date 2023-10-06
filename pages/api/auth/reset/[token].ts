import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import connectDb from "@/libs/mongodb";
import UserModel, { UserDocument } from "@/models/User.model";
import bcrypt from "bcrypt";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    connectDb();
    try {
        if (req.method === "PUT") {
            const { token } = req.query;
            const { password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                return res
                    .status(400)
                    .json({ message: "Passwords do not match" });
            }
            if (password.length < 6) {
                return res.status(400).json({
                    message: "Password must be at least 6 characters",
                });
            }
            if (token) {
                const decoded = await jwt.verify(
                    token as string,
                    process.env.NEXTAUTH_SECRET!
                );
                req.user = decoded as UserDocument;
            } else {
                return res
                    .status(400)
                    .json({ message: "Please provide token" });
            }

            const user = await UserModel.findById(req.user._id);
            if (user) {
                const salt = await bcrypt.genSalt(10);
                const passwordData = await bcrypt.hash(password, salt);

                await UserModel.findOneAndUpdate(
                    {
                        _id: req.user._id,
                    },
                    { password: passwordData, resetToken: "" }
                );

                return res
                    .status(200)
                    .json({ message: "Password updated successfully" });
            }
        }
    } catch (err) {
        res.status(500).json({ message: err });
    }
}
