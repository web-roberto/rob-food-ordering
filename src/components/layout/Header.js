"use client";
import {useSession,signOut} from "next-auth/react";
import Link from 'next/link'
import { useContext, useState } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import Bars2 from "../icons/Bars2";

export default function Header() {
  const session=useSession()
  //console.log('--Header--session:',session)
  const status=session?.status;
  //'name'con GoogleProvider y 'email' con Credenciales
  const userData=session.data?.user;
  let userName=userData?.name||userData?.email
  const {cartProducts} = useContext(CartContext);
const [mobileNavOpen , setMobileNavOpen] = useState(false)
  function AuthLinks({status,userName}){
    return (
      <>   
        {status ==="authenticated" && (
          <>
          {/* whitespace-nowrap para que esté en una misma linea: Hola, Roberto */}
            <Link href={'/profile'} className="whitespace-nowrap">Hello, {userName}</Link>
            <button className='bg-primary rounded-full text-white px-8 py-2'
            onClick={()=>signOut()}>Logout</button>
          </>
        )}
        {status ==="unauthenticated" && (
          <>
            <Link href="/login"> Login</Link>
            <Link href="/register" className='bg-primary rounded-full text-white px-8 py-2'>Register</Link>
          </>
        )}
      </>
    )
  }

  if (userName && userName.includes(' ')) {userName=userName.split(' ')[0]}

return(
  <>
   <header>
    <div className="flex items-center md:hidden justify-between">
      <Link className="text-primary font-semibold text-2xl" href={'/'}>ST PIZZA</Link>
      <div className="flex gap-8 items-center">
        <Link href={'/cart'} className="relative">
              <ShoppingCart /> 
              {cartProducts?.length >0 &&(
                <span className="absolute -top-2 -right-4 py-1 px-1 bg-primary text-xs text-white p-1 rounded-full leading-3">{cartProducts.length}</span>
              )}
        </Link>
        <button className="p-1 border" onClick={()=>setMobileNavOpen(prev=>!prev)}><Bars2 /></button>
      </div>
    </div>
    {mobileNavOpen &&(
      <div onClikc={()=>setMobileNavOpen(false)} className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center">
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>    
        <AuthLinks status={status} userName={userName}/>
      </div>
    )}
    <div  className='hidden md:flex items-center justify-between'>
    <nav className='flex items-center gap-8 text-gray-500 font-semibold'>
        <Link className="text-primary font-semibold text-2xl" href={'/'}>ST PIZZA</Link>
        <Link href={'/'}>Home</Link>
        <Link href={'/menu'}>Menu</Link>
        <Link href={'/#about'}>About</Link>
        <Link href={'/#contact'}>Contact</Link>
      </nav>
      <nav className='flex items-center gap-8 font-semibold'>
      {/* <div>status: {status}</div> */}
          <AuthLinks status={status} userName={userName}/>
          <Link href={'/cart'} className="relative">
            <ShoppingCart /> 
            {cartProducts?.length >0 &&(
              <span className="absolute -top-2 -right-4 py-1 px-1 bg-primary text-xs text-white p-1 rounded-full leading-3">{cartProducts.length}</span>
            )}
          </Link>
      </nav>
    </div>

   </header>
   </>
)
}
