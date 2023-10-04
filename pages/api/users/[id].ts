import { verifyJwt } from "@/libs/jwt";
import connectDb from "@/libs/mongodb";
import UsersListModel from "@/models/UsersList.model";
import { NextApiRequest, NextApiResponse } from "next";

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
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                phone: req.body.phone,
                gender: req.body.gender,
                email: req.body.email,
            };

            const result = await UsersListModel.findOneAndUpdate(
                {
                    _id: req.query.id,
                },
                user
            );

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "GET") {
        try {
            const users = await UsersListModel.findOne({ _id: req.query.id });

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "DELETE") {
        try {
            const result = await UsersListModel.findOneAndDelete({
                _id: req.query.id,
            });
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
