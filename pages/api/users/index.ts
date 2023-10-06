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
            const limit = 5;

            const filter = req?.query?.search;

            const regex = filter ? new RegExp(filter as string, "i") : /.*/;

            const skip = limit * (page as number);
            const query = [
                {
                    $match: {
                        $or: [
                            { code: { $regex: regex } },
                            { firstName: { $regex: regex } },
                            { lastname: { $regex: regex } },
                            { email: { $regex: regex } },
                        ],
                    },
                },

                {
                    $facet: {
                        paginatedResults: [
                            { $sort: { createdAt: -1 } },
                            {
                                $skip: skip,
                            },
                            {
                                $limit: limit,
                            },
                            {
                                $project: {
                                    updatedAt: 0,
                                    __v: 0,
                                },
                            },
                        ],
                        count: [
                            {
                                $count: "count",
                            },
                        ],
                    },
                },
                {
                    $project: {
                        result: "$paginatedResults",
                        count: {
                            $arrayElemAt: ["$count", 0],
                        },
                    },
                },
            ];

            const users = await UsersListModel.aggregate(query as never);
            const pageSize = filter
                ? users[0]?.count.count
                : await UsersListModel.count();
            const result = {
                users: users[0]?.result,
                total: pageSize,
                limit: limit,
                skip: limit * (page as number),
            };
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
