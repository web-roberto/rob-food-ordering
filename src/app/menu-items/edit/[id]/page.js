"use client"
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import { redirect, useParams } from 'next/navigation';

import UserTabs from "@/components/layout/UserTabs";
import toast from 'react-hot-toast';
import Link from 'next/link'
import Left from "@/components/icons/Left";
import MenuItemForm from "@/components/layout/MenuItemForm";
import DeleteButton from "@/components/DeleteButton";

export default function EditMenuItem(){
  const {id}=useParams()
  const [menuItem, setMenuItem] = useState(null)
  const [redirectToItems, setRedirectToItems] = useState(false)
  const {loading,data} =useProfile() //carga el perfil del usuario

  useEffect(() => { //los leo todos y filtro el que tiene mi id
    fetch('/api/menu-items').then(response=>{   //no hace falta TOASTERS aqui
      response.json().then(items=>{
        const item=items.filter(i=>i._id===id)
        console.log('....menu-items..GET  UNO ..',item[0]._id)
        setMenuItem(item[0])
      })
  }) }, [])

  async function handleFormSubmit(e,data){
    e.preventDefault();
    data={_id:id,...data} //como si fuera un let
    console.log('----handleFormSubmit-- MENUITEMS-PAGE-data',{data})
    //TOAST CON PROMESA 
    const savingPromise=new Promise(async(resolve,reject)=>{
      // el fecth normal envuelto por un promise y un resolve/reject final
      const response=await fetch('/api/menu-items',{
        method:'PUT',
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

  async function handleDeleteClick(){
    const promise=new Promise(async (resolve,reject)=>{
      const response=await fetch('/api/menu-items?_id='+id,{
        method:'DELETE',
        //headers:{'Content-Type':'application/json'}
      })
      if (response.ok) resolve(); else reject()
    })
    await toast.promise(promise,{
      loading:'Deleting item...',
      success:'Item deleted',
      error:'Error deleting item'
    })  
    setRedirectToItems(true)

    }



  if (redirectToItems) return redirect('/menu-items')

  if (loading) return 'Loading user info....'
  if (!data.admin) return 'Not an admin.'

  return(
    <section className="max-w-md mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button"><Left /><span>Show all menu items</span></Link>
      </div>
      <MenuItemForm onSubmit={handleFormSubmit} menuItem={menuItem}/>
      <div className="max-w-md mx-auto mt-4">
        <div className="border max-w-xs ml-auto pl-4">
          <DeleteButton label="Delete this menu item" onDelete={handleDeleteClick} />
        </div>
      </div>
    </section>
  )

}