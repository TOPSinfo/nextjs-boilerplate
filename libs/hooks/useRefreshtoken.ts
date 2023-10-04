"use client";

import axios from "@/helpers/axios";
import { useSession } from "next-auth/react";

export const useRefreshToken = () => {
    const { data: session } = useSession();
    const user = {
        username: session?.user.username,
        email: session?.user.email,
        id: session?.user.id,
    };
    const refreshToken = async () => {
        const res = await axios.post("/api/auth/refresh", {
            refresh: session?.user?.refreshToken,
            user: user,
        });
        console.log("session: ", session, res);

        if (session) {
            session.user.accessToken = res?.data?.token?.accessToken;
            session.user.refreshToken = res?.data?.token?.refreshToken;
        }
    };
    return refreshToken;
};
