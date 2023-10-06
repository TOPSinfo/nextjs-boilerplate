"use client";

import axios from "@/helpers/axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
    const session = useSession();
    const user = {
        username: session?.data?.user.username,
        email: session?.data?.user.email,
        id: session?.data?.user.id,
    };
    const refreshToken = async () => {
        const res = await axios.post("/api/auth/refresh", {
            refresh: session?.data?.user?.refreshToken,
            user: user,
        });
        console.log("session: ", session, res);

        if (session?.data) {
            session.data.user.accessToken = res?.data?.token?.accessToken;
            session.data.user.refreshToken = res?.data?.token?.refreshToken;
        }
    };
    return refreshToken;
};
