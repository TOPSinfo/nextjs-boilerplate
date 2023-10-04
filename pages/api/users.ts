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
            const page = req?.query?.page ? req.query?.page : 0;
            const limit = 2;
            const pageSize = await UsersListModel.count();

            const users = await UsersListModel.find({})
                .sort({ createdAt: -1 })
                .skip(limit * (page as number))
                .limit(limit);
            const result = {
                users: users,
                total: pageSize,
                limit: 2,
                skip: limit * (page as number),
            };
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
