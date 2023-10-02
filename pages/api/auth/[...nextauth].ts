import { nextauth } from "../../../libs/nextauth";
import NextAuth from "next-auth";

const handler = NextAuth(nextauth);
// export { handler as GET, handler as POST };
export default handler