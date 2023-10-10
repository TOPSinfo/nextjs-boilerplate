import { verifyJwt } from "@/libs/jwt";
import connectDb from "@/libs/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import multer from "multer";
import { Request, Response } from "express";
import UserModel from "@/models/User.model";
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
        const uploadDir = "./public/uploads/profileImage";
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

                const filePath = `${
                    process.env.NEXTAUTH_URL
                }uploads/profileImage/${(req as MulterRequest).file.filename}`;
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
                        profilePic: filePath,
                    };

                    const result = await UserModel.findOneAndUpdate(
                        {
                            _id: req.body.id,
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
            const users = await UserModel.findOne({ _id: req.query.id }).select('-password');

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}
