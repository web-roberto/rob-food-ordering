"use client";
import Image from "next/image";
import MenuItem from "../menu/MenuItem";
import SectionHeaders from "./SectionHeaders";
import { useEffect, useState } from "react";

export default function HomeMenu(){
  const [bestSellers, setBestSellers] = useState([])
  useEffect(() => {
    fetch('/api/menu-items').then(response=>{   //no hace falta TOASTERS aqui
      response.json().then(menuItems=>{
      setBestSellers(menuItems.slice(-3))//los 3 últimos
      })
    })  }, [])
  
  return (
    <section className="">
      {/* Toma todo el ancho: left-0 y right-0 */}
      <div className="absolute left-0 right-0 w-full">
        {/* El "absolute" respecto al "body" pq no hay ningun relative */}
        <div className="absolute left-0 text-left -top-[70px]  -z-10">
          <Image src={'/sallad1.png'}width={109} height={189} alt={'sallad'}/>
        </div>
        <div className="absolute -top-[100px] right-0 -z-10">
          {/* El tamaño width y height lo saco del Inspector del Chrome */}
          <Image src={'/sallad2.png'} width={107} height={195} alt={'sallad'}/>
        </div>
      </div>
      <div className="text-center mb-4">
          <SectionHeaders subHeader={'Check out'} mainHeader={'Our Best Sellers'}/>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {bestSellers?.length>0 && bestSellers.map((item)=>(
        <MenuItem key={item._id} {...item}/>
        )) }
      </div>
    </section>
  )
}