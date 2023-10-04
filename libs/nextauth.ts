import connectDb from "@/libs/mongodb";
import UserModel from "@/models/User.model";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { signJwtAccessToken } from "./jwt";

export const nextauth: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3600,
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
                const user = {
                    id: existingUser._id,
                    username: existingUser.username,
                    email: existingUser.email,
                };
                const accessToken = signJwtAccessToken(user);
                const result = { ...user, ...accessToken };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return result as any;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user };
        },

        async session({ session, token }) {
            session.user = token as never;
            return session;
        },
    },
    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(nextauth);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
