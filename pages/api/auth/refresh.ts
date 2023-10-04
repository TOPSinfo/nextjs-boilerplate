// pages/api/refresh.ts
import { signJwtAccessToken, verifyRefreshJwt } from "@/libs/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        return res.status(405).end(); // Method Not Allowed
    }

    const { refresh, user } = req.body;

    try {
        // Verify the refresh token (replace 'your-refresh-token-secret' with your actual refresh token secret)
        const decoded = verifyRefreshJwt(refresh);
        let token;
        if (decoded) token = signJwtAccessToken(user);

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return res.status(401).end(); // Unauthorized
    }
}
