import Image from "next/image"
import Trash from "@/components/icons/Trash";
import { cartProductPrice } from "@/components/AppContext";


export default function CartProduct({product,onRemove,index}){

  return(
    <div className="flex items-center gap-4 border-b py-4">
    <div className="w-24">
        <Image width={240}  height={240} src={product?.image} alt={''}/>
    </div>
    <div className="grow">
      <h3 className="font-semibold">{product?.name}</h3>
      {product?.size &&(
        <div className="text-sm">Size: <span>{product?.size?.name}</span></div>
      )}
      {product?.extras?.length >0 &&(
        <div>
          {product.extras.map(extra=>(
          <div key={`${extra._id}-${Math.ceil(Math.random()*100000)}`} className="text-sm text-gray-500"><span>Extra: {extra?.name} ${extra?.price}</span></div>))}
        </div>
      )}
    </div>
    <div className="text-lg font-semibold">
    ${cartProductPrice(product)}
    </div>
    {!!onRemove &&( //sin no le paso un onRemove en la llamada, no pinta el boton de borrar
      <div className="ml-2">
        <button className="p-2" type="button" onClick={()=>onRemove(index)}><Trash /></button>
      </div>
    )}
 
  </div>
  )
}


