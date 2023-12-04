//parte SERVIDOR (el node de next)
import mongoose from "mongoose"
import { MenuItem } from "@/models/MenuItem"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function POST(req){
 mongoose.connect(process.env.MONGO_URL)
 if (await isAdmin()){

  const data=await req.json() //del cliente hago Stringify y aqui lo contrario(json)
  //const {image,name,description,basePrice}=data;
  //console.log('-------POST MENU ITEMS data------------------',{data})
  const menuItemDoc=await MenuItem.create(data)
  return Response.json(menuItemDoc)
 } else return Response.json({})
}

export async function PUT(req){
  mongoose.connect(process.env.MONGO_URL)
  if (await isAdmin()){
    const {_id,...remaining}=await req.json()
    //console.log('--PUT--/api/menu-items--remaining-} es',{remaining})
    //const menuitemDoc=await MenuItem.findByIdAndUpdate(_id,...remaining) //No me funcionaba
    await MenuItem.findOneAndUpdate({_id},{...remaining})
    // findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...).
    // Otras actualizaciones posibles son:
    //  findOneAndUpdate({email},otherUserInfo,{upsert:true}) //email en lugar del _id
    //  updateOne({email},{name,image}) //email en lugar del _id
    // findOneAndUpdate
    return Response.json(true)
  }
}

export async function GET(){ //GET ALL
  mongoose.connect(process.env.MONGO_URL)
    const menuitemDoc=await MenuItem.find() 
    //console.log('--GET--/api/menu-items---menuitemDoc es',menuitemDoc)
    return Response.json(menuitemDoc)
}


export async function DELETE(req){
  mongoose.connect(process.env.MONGO_URL)
  const url=new URL(req.url) //body es .json()
  const _id=url.searchParams.get('_id')
  if (await isAdmin()){
    await MenuItem.deleteOne({_id}) 
  }
  return Response.json(true)
}