import { verifyJwt } from "@/libs/jwt";
import connectDb from "@/libs/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@/models/User.model";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await connectDb();
    const { method, headers } = req;

    if (!headers.authorization || !verifyJwt(headers.authorization as never)) {
        const err = { message: "User not authorized" };
        return res.status(401).json(err);
    }

    if (method === "PUT") {
        try {
            const user = {
                username: req.body.username,
                email: req.body.email,
                birth_date: req.body.birth_date,
                city: req.body.city,
                state: req.body.state,
                gender: req.body.gender,
                address: req.body.address,
                zip: req.body.zip,
            };

            const result = await UserModel.findOneAndUpdate(
                {
                    _id: req.body.id,
                },
                user
            ).select("-password");

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "GET") {
        try {
            const users = await UserModel.findOne({ _id: req.query.id }).select(
                "-password"
            );

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
