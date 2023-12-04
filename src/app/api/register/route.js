//parte SERVIDOR (el node de next)
import mongoose from "mongoose"
import { User } from "@/models/User"

export async function POST(req){
  mongoose.connect(process.env.MONGO_URL)
  const body=await req.json()
  //console.log('--POST--/api/register---body es',body)
  const pass=body.password;
  if (!pass?.length||pass?.length<5){
    new Error('password must be at least 5 characters')
  }
  const notHashedPassword=pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);  
  //console.log('--api/register--POST--body-- ',body)
  const createdUser=await User.create(body)
  //console.log('--POST--/api/register---createdUser es',createdUser)

  return Response.json(createdUser)
}