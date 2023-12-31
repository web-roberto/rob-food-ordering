"use client"
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from 'react-hot-toast';
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import {useProfile} from "@/components/UseProfile"
import SectionHeaders from "@/components/layout/SectionHeaders";
import { CartContext, cartProductPrice } from "@/components/AppContext";
import AddressInputs from "@/components/layout/AddressInputs";
import CartProduct from "@/app/menu/CartProduct";


export default function OrdersPage(){
 // const session=useSession()
 const {clearCart}=useContext(CartContext)
 const [order, setOrder] = useState()
 const [loadingOrder, setLoadingOrder] = useState(true)

  //const {loading,data} =useProfile()
  const {id} = useParams(); //users/[id]

  useEffect(()=>{
    if (typeof window.console!== 'undefined') {
      if (window.location.href.includes('clear-cart=1')){
        clearCart()
      }
    }
      if(id) {
        setLoadingOrder(true)
        fetch('/api/orders?_id='+id).then(res=>{
          res.json().then(orderData=>{setOrder(orderData);setLoadingOrder(false)
          })
        })
    }
  },[id])
  let subtotal=0;
  if (order?.cartProducts){
    for (const product of order?.cartProducts){
      subtotal+=cartProductPrice(product) //base+extras+size
    }
  }

  //clear-cart=1
//GET a /api/orders?_id=num_pedido sea Admin o no
//GET ALL a  /api/orders -> como Admin
//GET ALL my Orders a /api/orders -> no como Admin

  return (
    <section className="max-w-2xl  mx-auto mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Your order"/>
        <div className="mt-4 mb-8">
          <p>Thanks for your order.</p>
          <p>We will call you when your order will be on the way.</p>
        </div>
      </div>
      {loadingOrder && (
          <div>Loading order...</div>
        )}
      {order &&(
        <div className="grid md:grid-cols-2 md:gap-16">
          <div>
            {order.cartProducts.map(product=>(
               <CartProduct key={`${product._id}-${Math.ceil(Math.random()*100000)}`}  product={product} />
            ))}
            <div className="text-right py-2 text-gray-500">
              Delivery <span className="text-black font-bold inline-block w-8">${subtotal}</span> <br />
              Subtotal <span className="text-black font-bold inline-block w-8">$5</span> <br />
              Total <span className="text-black font-bold inline-block w-8">${subtotal+5}</span> 
           </div>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <AddressInputs disabled={true} addressProps={order} />
          </div>
        </div>
      )}    
    </section>

  )

}