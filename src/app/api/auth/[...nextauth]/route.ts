import { authOptions} from "@/utils/auth.options";
import NextAuth from "next-auth";


const handler = (NextAuth as any)(authOptions);
export { handler as GET, handler as POST };