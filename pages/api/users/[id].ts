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
        const uploadDir = "./public/uploads";
        fs.mkdirSync(uploadDir, { recursive: true });
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
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

    if (method === "PUT") {
        upload.single("profile_pic")(
            req as unknown as Request,
            res as unknown as Response,
            async (err: unknown) => {
                console.log("error", err);

                const filePath = `${process.env.NEXTAUTH_URL}uploads/${
                    (req as MulterRequest).file.filename
                }`;
                try {
                    const user = {
                        firstName: req.body.firstName,
                        lastname: req.body.lastname,
                        phone: req.body.phone,
                        gender: req.body.gender,
                        email: req.body.email,
                        profilePic: filePath,
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
        );
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
