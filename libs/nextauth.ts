import connectDb from "@/libs/mongodb";
import UserModel from "@/models/User.model";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import { signJwtAccessToken } from "./jwt";
import GoogleProvider from "next-auth/providers/google";

export const nextauth: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 3600,
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
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
                    id: existingUser?._id,
                    username: existingUser?.username,
                    email: existingUser?.email,
                    profilePic: existingUser?.profilePic
                };
                const accessToken = signJwtAccessToken(user);
                const result = { ...user, ...accessToken };
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                return result as any;
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === "google") {
                const googleAuthData = {
                    username: user.name,
                    email: user.email,
                    google_id: user.id,
                    profilePic: user.image,
                };
                await connectDb();
                const existingUser = await UserModel.findOne({
                    email: user.email,
                });
                if (!existingUser) {
                    await UserModel.create({
                        ...googleAuthData,
                    });
                }
                return true;
            }
            return true;
        },
        async jwt({ token, user, account }) {
            if (account) {
                const accessToken = signJwtAccessToken(user);
                await connectDb();
                const existingUser = await UserModel.findOne({
                    email: user.email,
                });
                user.id = existingUser?._id.toString();
                token.id = existingUser?._id.toString();
                token.username = user.name;
                token.accessToken = accessToken.accessToken;
                token.refreshToken = accessToken.refreshToken;
                token.profilePic = user.image;
            }
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
