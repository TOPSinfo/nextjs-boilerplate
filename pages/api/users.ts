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

    if (method === "POST") {
        try {
            const result = await UsersListModel.create({
                firstName: req.body.firstName,
                lastname: req.body.lastname,
                phone: req.body.phone,
                gender: req.body.gender,
                email: req.body.email,
            });

            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
    if (method === "GET") {
        try {
            const users = await UsersListModel.find({});
            const result = {
                users: users,
                total: users.length,
                limit: 20,
                skip: 0,
            };
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
