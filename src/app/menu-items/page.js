"use client"
import {useProfile} from "@/components/UseProfile";
import Right from "@/components/icons/Right";
import UserTabs from "@/components/layout/UserTabs";
import Link from 'next/link'
import { useEffect, useState } from "react";
import Image from "next/image";


export default function MenuItemsPage(){
  const {loading,data} =useProfile() //carga el perfil del usuario
  const [menuItems, setMenuItems] = useState([])
  
  useEffect(() => {
    fetch('/api/menu-items').then(response=>{   //no hace falta TOASTERS aqui
      response.json().then(menuItems=>{
        setMenuItems(menuItems)
      })
    })  }, [])

  if (loading) return 'Loading user info....'
  if (!data.admin) return 'Not an admin.'

  return(
    <section className="mt-8 max-w-2xl mx-auto">
       <UserTabs isAdmin={true} />  
       <div className="mt-8 ">
       <Link className="button flex" href={'/menu-items/new'}><span>Create a new menu item</span>
         <Right/>
       </Link>
       </div>
       <div>
        <h2 className="text-sm text-gray-500 mt-8">Edit menu item:</h2>
         <div className="grid grid-cols-3 gap-">
          {menuItems?.length>0 && menuItems.map(item=>(
          <Link  key={item._id} href={'/menu-items/edit/'+item._id} 
            className="bg-gray-200 rounded-lg p-4">
            <div className="relative">
               <Image className="rounded-md" src={item.image} alt={''} width={200} height={200}/>
            </div>
            {item.name}</Link>))}
          </div>
        </div>
    </section>
    )
}