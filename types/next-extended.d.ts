// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextApiRequest } from "next";

declare module "next" {
    interface NextApiRequest {
        user: { _id?: string; username: string; email: string };
    }
}
