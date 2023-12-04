"use client";

import AddToCartButton from "./AddToCartButton";
import Image from "next/image"

export default function MenuItemTile({onAddToCart,item}){
  //la card del menu (no la ventanita con sizes y extras)
 const {image,name,description, basePrice,sizes,extraIngredientPrices}=item;
 const hasSizesOrExtras=(sizes?.length>0 ||extraIngredientPrices?.length>0)



  return (
    <div className="bg-gray-200 p-4 rounded-lg text-center
    hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all">
        <div className="text-center">
          <Image src={image} alt="pizza" className="max-h-24 block mx-auto"/>
        </div>
      <h4 className="font-semibold my-3 text-xl">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton hasSizesOrExtras={hasSizesOrExtras} basePrice={basePrice} 
      onClick={onAddToCart} image={image}/>
    </div>
  )
}