import connectDb from "@/libs/mongodb";
import UserModel from "@/models/User.model";
import { NextApiResponse } from "next";

interface NewUserRequest {
    username: string;
    email: string;
    password: string;
}
interface NewUserResponse {
    id: string;
    username: string;
    email: string;
}

export default async function handler(
    req: Request,
    res: NextApiResponse<{
        user?: NewUserResponse;
        message?: string;
        error?: string;
        status?: number;
    }>
) {
    const payload = req.body as unknown as NewUserRequest;
    await connectDb();
    const user = await UserModel.findOne({ email: payload.email });

    if (user) {
        return res?.status(422).json({
            error: "Email is already in use",
            status: 422,
        });
    }
    const newUser = await UserModel.create({ ...payload });
    return res?.status(200).json({
        user: {
            id: newUser._id.toString(),
            email: newUser.email,
            username: newUser.username,
        },
        message: "Registration successful",
    });
}
