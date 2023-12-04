"use client"
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import { redirect } from 'next/navigation';

import UserTabs from "@/components/layout/UserTabs";
import toast from 'react-hot-toast';
import EditableImage from "@/components/layout/EditableImage";
import Link from 'next/link'
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";


export default function NewMenuItem(){
  const [redirectToItems, setRedirectToItems] = useState(false)
  const {loading,data} =useProfile() //carga el perfil del usuario

  async function handleFormSubmit(e,data){
    e.preventDefault();
    console.log('----handleFormSubmit-- MENUITEMS-PAGE-data',{data})
    //TOAST CON PROMESA 
    const savingPromise=new Promise(async(resolve,reject)=>{
      // el fecth normal envuelto por un promise y un resolve/reject final
      const response=await fetch('/api/menu-items',{
        method:'POST',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
      })
      console.log('----handleFormSubmit-- MENUITEMS-PAGE-response',{response})
      if (response.ok) resolve(); else reject();
    })
    //el 
    await toast.promise(savingPromise,{
      loading:'Saving this tasty item ...',
      success:'Item saved!',
      error:'Error'
    })
    setRedirectToItems(true)
    // return redirect('/menu-items')-> no funciona dentro de una función
  }
  if (redirectToItems) return redirect('/menu-items')

  if (loading) return 'Loading user info....'
  if (!data.admin) return 'Not an admin.'

  return(
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button"><Left /><span>Show all menu items</span></Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={null}/>
    </section> 
  )

}