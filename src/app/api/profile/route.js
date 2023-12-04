//parte SERVIDOR (el node de next)
import mongoose from "mongoose"
import { User } from "@/models/User"
import { getServerSession } from "next-auth"
import  {authOptions} from '@/app/api/auth/[...nextauth]/route'
import { UserInfo } from "@/models/UserInfo"

export async function PUT(req){
 mongoose.connect(process.env.MONGO_URL)
  const data=await req.json()
  const {_id,name,image,...otherUserInfo}=data
 // console.log('--PUT--/api/profile---body es',data)
  let filter={}
  if (_id) { //PUT de /users/[id]/page.js -> edit id
    filter={_id}
   }
  else {
    //PUT de profile. No tengo _id y lo actualizao por 'email'
     const session = await getServerSession(authOptions)
     const email=session.user.email;
     filter={email}
     }
     //console.log('----profile-----PUT--filter-', filter)
  const user=await User.findOne(filter) //por _id o por email
  //console.log('----profile-----PUT--user-', user)

  await User.updateOne(filter,{name,image}) //email en lugar del _id
  await UserInfo.findOneAndUpdate({email:user.email},otherUserInfo,{upsert:true}) //email en lugar del _id
  return Response.json(true)
}

export async function GET(req){ //GET  1 ser
  mongoose.connect(process.env.MONGO_URL)
  const url=new URL(req.url) //body es .json()
  const _id=url.searchParams.get('_id')
  let user;
  let userInfo;
  if(_id) { //GET de api/profile?_id=id -> get por id
     user=await User.findOne({_id}).lean()
     userInfo=await UserInfo.findOne({email:user.email}).lean()
  } else {
    const session = await getServerSession(authOptions)
    const email=session?.user?.email;
    //console.log('--GET--/api/profile---email} es',email)
    if (!email) return Response.json({}) //si está vacio pq está iniciada la sesión. ej. escribo la url sin login antes
    user=await User.findOne({email}).lean() //email en lugar del _id
    userInfo=await UserInfo.findOne({email}).lean() //o puedo usar tambien user.email
  }
 // sin .lean() -> return Response.json({...user?._doc,...userInfo?._doc})
 return Response.json({...user,...userInfo}) //con lean() -> el segundo _id se impone
}
