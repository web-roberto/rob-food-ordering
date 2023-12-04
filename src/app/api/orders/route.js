//parte SERVIDOR (el node de next)
import mongoose from "mongoose"
import { Order } from "@/models/Order"
import { getServerSession } from "next-auth"
import { authOptions, isAdmin } from "../auth/[...nextauth]/route"


// import  {authOptions} from '@/app/api/auth/[...nextauth]/route'

export async function GET(req){ //GET ALL
  mongoose.connect(process.env.MONGO_URL)
  const url=new URL(req.url) //body es .json()
  const _id=url.searchParams.get('_id')
  const session= await getServerSession(authOptions)
  const userEmail=session?.user?.email;
  const admin=await isAdmin()
  console.log('----- GET ALL --- ORDERS---userEmail---',userEmail)
  if (_id) {  //localhost:3000/api/orders?_id=
   // console.log('----- GET ALL --- ORDERS---_id---',_id)
  return Response.json(await Order.findById(_id)) // return Response.json(await Order.findOne({_id}))
  }  //Order.findOne({_id}).lean()

  //si localhost:3000/api/orders

  if (isAdmin){  //si localhost:3000/api/orders
    //show all the orders
    //console.log('----- GET ALL --- ORDERS---dentro isAdmin--',isAdmin)
    return Response.json(await Order.find())
  }
  if (userEmail){
    //all the orders of the current user
   //console.log('----- GET ALL --- ORDERS---userEmail--dentro-',userEmail)
    return Response.json(await Order.find({userEmail}))
  }


  const orderDoc=await Order.find() 
  //console.log('--GET--/api/menu-items---catmenuitemDocegories} es',menuitemDoc)
  return Response.json(orderDoc)
}

// export async function POST(req){
//  mongoose.connect(process.env.MONGO_URL)
//   const data=await req.json() //del cliente hago Stringify y aqui lo contrario(json)
//   //const {image,name,description,basePrice}=data;
//   //console.log('-------POST MENU ITEMS data------------------',{data})
//   const menuItemDoc=await MenuItem.create(data)
//   return Response.json(menuItemDoc)
// }

// // export async function GET(req){ //get one
// //   mongoose.connect(process.env.MONGO_URL)
// //   const {_id}=await req.json()
// //   const menuitem=await MenuItem.findOne({_id})
// //   return Response.json(menuitem)
// // }

// export async function PUT(req){
//   mongoose.connect(process.env.MONGO_URL)
//   const {_id,...remaining}=await req.json()
//   //console.log('--PUT--/api/menu-items--remaining-} es',{remaining})
//   //const menuitemDoc=await MenuItem.findByIdAndUpdate(_id,...remaining) //No me funcionaba
//   const menuitemDoc=await MenuItem.findOneAndUpdate({_id},{...remaining})
//   // findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...).
//   // Otras actualizaciones posibles son:
//   //  findOneAndUpdate({email},otherUserInfo,{upsert:true}) //email en lugar del _id
//   //  updateOne({email},{name,image}) //email en lugar del _id


//   // findOneAndUpdate

//   return Response.json(menuitemDoc)
// }




// export async function DELETE(req){
//   mongoose.connect(process.env.MONGO_URL)
//   const url=new URL(req.url) //body es .json()
//   const _id=url.searchParams.get('_id')
//   await MenuItem.deleteOne({_id}) 
//   return Response.json(true)
// }