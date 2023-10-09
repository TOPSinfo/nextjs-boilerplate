import { verifyJwt } from "@/libs/jwt";
import connectDb from "@/libs/mongodb";
import UsersListModel from "@/models/UsersList.model";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import multer from "multer";
import { Request, Response } from "express";
export const config = {
    api: {
        bodyParser: false, // Disable built-in body parsing
    },
};
interface MulterRequest extends NextApiRequest {
    file: { filename: string };
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("test", file, req);

        const uploadDir = "./public/uploads";
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        console.log("filefilefile", file);
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10, // 10MB limit (adjust as needed)
    },
});

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
        upload.single("profile_pic")(
            req as unknown as Request,
            res as unknown as Response,
            async (err: unknown) => {
                console.log("error", err);

                const filePath = `${process.env.NEXTAUTH_URL}uploads/${
                    (req as MulterRequest).file.filename
                }`;
                try {
                    const user = new UsersListModel({
                        firstName: req.body.firstName,
                        lastname: req.body.lastname,
                        profilePic: filePath,
                        phone: req.body.phone,
                        gender: req.body.gender,
                        email: req.body.email,
                    });
                    const result = await user.save();
                    res.status(200).json(result);
                } catch (err) {
                    res.status(500).json(err);
                }
            }
        );
    }
    if (method === "GET") {
        try {
            const page = (req?.query?.page && req.query?.page) || 0;
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
