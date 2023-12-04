import NextAuth, { getServerSession } from "next-auth"; //1
import * as mongoose from "mongoose"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { User } from "@/models/User"
import bcrypt from "bcrypt"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/libs/mongoConnect";
import { UserInfo } from "@/models/UserInfo"


export const authOptions = { //tambien lo uso en las APIs
  secret:process.env.SECRET, //1
 adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      id:'credentials', //1
      credentials: {
        username: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) { 
        //aquí recibo de app/login/page.js el : await signIn('credentials',{email,password}) 
        const email=credentials?.email;
        const password=credentials?.password;
       // console.log('--handler=NextAuth--email-- ',email)
       // console.log('--handler=NextAuth--password-- ',password)

        //como en api/register/route.js llamo al mongoose.connect
        mongoose.connect(process.env.MONGO_URL)
        const user=await User.findOne({email})
       // console.log('--handler=NextAuth--user-- ',user)
        const passwordOk= user && bcrypt.compareSync(password,user.password);
       // console.log('--handler=NextAuth--passwordOk-- ',passwordOk)

        if (passwordOk) return user;
        return null;
      }
    })
  ]
}

export async function isAdmin(){
  const session = await getServerSession(authOptions)
  const userEmail=session?.user?.email;
  if (!userEmail) return false; //no es un admin
  const userInfoDoc=await UserInfo.findOne({email:userEmail}) //email en lugar del _id
  if (!userInfoDoc) return false; //no es un admin
  return userInfoDoc?.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }