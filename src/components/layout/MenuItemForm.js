"use client"
import { useEffect, useState } from "react";

import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "./MenuItemPriceProps";

export default function MenuItemForm({onSubmit,menuItem}){
  //const {id}=useParams()

  const [name , setName] = useState(menuItem?.name ||'') //Ok
  const [description , setDescription] = useState(menuItem?.description ||'')  //Ok
  const [basePrice , setBasePrice] = useState(menuItem?.basePrice ||'')  //Ok
  const [image,setImage]=useState(menuItem?.image ||'')  //Ok
  const [sizes, setSizes] = useState(menuItem?.sizes ||[]) //se usa en su hijo pero reside aquí para guardar los datos
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(menuItem?.extraIngredientPrices ||[])
  const [category, setCategory] = useState(menuItem?.category||'')
  const [categories, setCategories] = useState([])
 
  useEffect(() => {
    fetch('/api/categories').then(response=>{ //Get del getServerSession desde el servidor
      response.json().then(categories=>{
        setCategories(categories)
      })
    })  }, [])


  return(
    <>
    <form onSubmit={e=>onSubmit(e,{name,description,basePrice,image,sizes,extraIngredientPrices,category})} 
    className="mt-8 max-w-2xl mx-auto">
        <div className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.3fr .7fr'}}>
          <div>
          <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label>Item name</label>
            <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} />
            <label>Description</label>
            <input type="text"  value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Category {category}</label>
            <select value={category} onChange={e=>setCategory(e.target.value)}> 
            <option value={""}>select a category</option>
            {categories.length >0 && (
              categories.map(category=>{
                return (
                  <option key={category._id} value={category?._id}>{category.name}</option>
                )
              })
            )}
            </select>
            <label>Base Price</label>
            <input type="text" value={basePrice} onChange={(e)=>setBasePrice(e.target.value)}/>
            <MenuItemPriceProps name={'Sizes'} addLabel={'Add item size'} props={sizes} setProps={setSizes}/>
            <MenuItemPriceProps name={'Extra ingredients'} addLabel={'Add ingredients prices'}  props={extraIngredientPrices} 
            setProps={setExtraIngredientPrices}/>

            <button type="submit">Save</button>
          </div>
          
        </div>
      </form>



  </>
  )
}