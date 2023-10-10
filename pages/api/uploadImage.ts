// pages/api/upload.ts

import multer from "multer";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { Request, Response } from "express";
import UserModel from "@/models/User.model";
import fs from "fs";

const uploadDirectory = "./public/uploads/profileImage"; // Define the directory where uploads will be stored
export const config = {
    api: {
        bodyParser: false, // Disable built-in body parsing
    },
};
interface MulterRequest extends NextApiRequest {
    file: { filename: string };
}
// Create a Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        fs.mkdirSync(uploadDirectory, { recursive: true });
        cb(null, uploadDirectory);
    },
    filename: (req, file, cb) => {
        const extension = path.extname(file.originalname);
        const filename = `${Date.now()}${extension}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        if (req.method === "POST") {
            // Use the `upload` middleware to handle the file upload
            await upload.single("profilePic")(
                req as unknown as Request,
                res as unknown as Response,
                async err => {
                    if (err) {
                        console.error("Error uploading image failed:", err);
                        res.status(500).json({
                            success: false,
                            message: "Image upload failed",
                        });
                        return;
                    }

                    // Get the file path
                    const filePath = `${
                        process.env.NEXTAUTH_URL
                    }uploads/profileImage/${
                        (req as MulterRequest).file.filename
                    }`;

                    // You can save the file path to a database here if needed
                    const image = await UserModel.findOneAndUpdate(
                        { _id: req.body.id },
                        { profilePic: filePath }
                    );
                    // Respond with the file path or URL
                    return res.status(200).json({
                        success: true,
                        imageUrl: image?.profilePic,
                    });
                }
            );
        }
    } catch (error) {
        console.error("Error uploading image:", error);
        res.status(500).json({
            success: false,
            message: "Image upload failed",
        });
    }
}
