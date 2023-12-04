"use client";
import { useContext,useState } from "react";
import { CartContext } from "../AppContext";
import toast from "react-hot-toast"
import MenuItemTile from "./MenuItemTile";
import Image from "next/image"
import FlyingButton from 'react-flying-item'


export default function MenuItem(menuItem) {
  const {image,name,description, basePrice,category,sizes,extraIngredientPrices}=menuItem;
  const [selectedSize, setSelectedSize] = useState(sizes?.[0]||null) //selecciono el 1º de entrada
  const [selectedExtras, setSelectedExtras] = useState([])
  const [showPopup, setshowPopup] = useState(false)
  const {addToCart} = useContext(CartContext);

  async function handleAddTCartButtonClick(){
    //lo llamo de be boton del item del menu y del boton de dentro de la ventanilla
    const hasOptions=sizes.length>0 || extraIngredientPrices.length>0
    if(hasOptions &&!showPopup) { //y no està abierto
      setshowPopup(true)
      return;} //solo se ejecuta la 1ª vez para abrir la ventana.
    addToCart(menuItem,selectedSize,selectedExtras) //funcion aunque este vació size y extras
    // en lugar de un Timeout como el de abajo: hago un async y la linea de abajo:
    await new Promise(resolve => setTimeout(resolve,800));
    setshowPopup(false) 
    // setTimeout(()=>{
    //   setshowPopup(false) //cierra la ventanita
    //   toast.success('Added to cart!',{position:'top-right'})
    // },1000)
  }
 
  function handleExtraClick(e,extra){
    console.log('--------MenuItem---handleExtraClick----e:',e)
    const checked=e.target.checked;
    if (checked) {setSelectedExtras(prev=>[...prev,extra])}
    else{setSelectedExtras(prev=>prev.filter(ex=>ex.name!==extra.name))}
  }
 let selectedPrice=basePrice;
 if (selectedSize){selectedPrice +=selectedSize.price;}
 if (selectedExtras?.length >0) {selectedExtras.map(extra=>selectedPrice+=extra.price)}

  return(
    <>
    {/* 1º la ventana con sizes y extras y 2º el card del menu ppal con la ventana cerrada */}
    {showPopup &&(
      // Clic en la zona exterior a la ventana (gris) cierra la ventanita
      <div onClick={()=>setshowPopup(false)} 
        className="fixed inset-0 bg-black/80 flex justify-center items-center">
        <div onClick={(e)=>e.stopPropagation()} 
          className="my-8 bg-white p-2 rounded-lg max-w-md">
          <div className="overflow-y-scroll p-2" style={{maxHeight:'calc(100vh - 100px)'}}>
          <Image src={image} alt={name} width={300} height={200} className="mx-auto"/>
          <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
          <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
          {sizes?.length>0 && (
            <div className="p-2">
              <h3 className="text-center text-gray-700">Pick your size</h3>
              {sizes.map(size=>(
                <label key={size._id} className="flex items-center gap-1 p-4 border rounded-md mb-1">
                  <input type="radio" name="size" checked={selectedSize?.name===size.name} 
                  onChange={()=>setSelectedSize(size)}/> {size.name} ${basePrice+size.price}
                </label>
              ))}
            </div>
          )}
            {extraIngredientPrices?.length>0 && (
            <div className="p-2">
              <h3 className="text-center text-gray-700">Any extras?</h3>
              {extraIngredientPrices.map(extra=>(
                <label key={extra._id} className="flex items-center gap-1 p-4 border rounded-md mb-1">
                  <input type="checkbox" name={extra.name}
                  checked={selectedExtras.map(e=>e._id).includes(extra._id)}
                   onChange={(e)=>handleExtraClick(e,extra)}/> {extra.name} + ${extra.price}
                </label>
              ))}
            </div>
          )}

            <div className="flying-button-parent mt-4" onClick={handleAddTCartButtonClick}>
              <FlyingButton src={image}  targetTop={'5%'} targetLeft={'95%'}>
                  Add to cart ${selectedPrice}
              </FlyingButton>
            </div>

          {/* <button onClick={handleAddTCartButtonClick}
          className="primary sticky bottom-2" type="button">Add to cart ${selectedPrice} </button> */}
        
          <button onClick={()=>setshowPopup(false)}>Cancel</button>
          </div>
        </div>
      </div>
    )}
    {/* Ahora el menu base sin extras de la ventana de menu */}
    <MenuItemTile className="mt-2" onAddToCart={handleAddTCartButtonClick} item={menuItem}/>
    </>
  )
}