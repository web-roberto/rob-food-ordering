//parte SERVIDOR (el node de next)
import mongoose from "mongoose"
import { Category } from "@/models/Category"
import { isAdmin } from "../auth/[...nextauth]/route"

export async function POST(req){
 mongoose.connect(process.env.MONGO_URL)
 if (await isAdmin()){
    const {name}=await req.json()
    //console.log('--POST--/api/category---body es',{name})
    const categoryDoc=await Category.create({name})
    //console.log('--POST--/api/category---createdCategory es',categoryDoc)
    return Response.json(categoryDoc)
 }else return Response.json({})
}
export async function PUT(req){
  mongoose.connect(process.env.MONGO_URL)
  const {name,_id}=await req.json()
  //console.log('--PUT--/api/categories---body es',{name,_id})
  if (await isAdmin()){
    await Category.updateOne({_id},{name}) //email en lugar del _id
    //console.log('--PUT--/api/category---categoryDoc es',categoryDoc)
  }
  return Response.json(true)
}

export async function GET(){ //GET ALL
  mongoose.connect(process.env.MONGO_URL)
    const categories=await Category.find() 
    //console.log('--GET--/api/categories---categories} es',categories?.[0])
    return Response.json(categories)
}

export async function DELETE(req){
  mongoose.connect(process.env.MONGO_URL)
  const url=new URL(req.url) //body es .json()
  const _id=url.searchParams.get('_id')
  if (await isAdmin()){
    await Category.deleteOne({_id}) 
  }
  return Response.json(true)
}