import { User } from "@/models/User"
import mongoose from "mongoose"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function GET(){ //GET user session
  mongoose.connect(process.env.MONGO_URL)
  if (await isAdmin()){ //si no eres admin no puedes leer 
     const users=await User.find() 
     return Response.json(users)
  } else {
    return Response.json([])
  }
}