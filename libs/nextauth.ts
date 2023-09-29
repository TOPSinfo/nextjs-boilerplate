import connectDb from "@/libs/mongodb";
import UserModel from "@/models/User.model";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const nextauth: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            id: "credentials",
            type: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                await connectDb();
                const existingUser = await UserModel.findOne({
                    email,
                });
                console.log(existingUser, "existingUser");

                if (!existingUser) throw Error("email mismatch");

                const passwordMatch = await existingUser?.comparePassword(
                    password
                );
                if (!passwordMatch) throw Error("password mismatch");

                return {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } as any;
            },
        }),
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        jwt(params: any) {
            if (params?.user) {
                params.token = params?.user;
            }
            console.log("parameters",params);
            return params.token;
        },
        session({ session, token }) {
            if (session?.user) {
                (session.user as { id: string }).id = token.id as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const authHandler = NextAuth(nextauth);

export {
    authHandler as GET,
    authHandler as POST,
    authHandler as PUT,
    authHandler as DELETE,
};