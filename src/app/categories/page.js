"use client"
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import toast from 'react-hot-toast';
import DeleteButton from "@/components/DeleteButton";




export default function CategoriesPage(){
  const [categoryName , setCategoryName] = useState("")
  const {loading:profileLoading,data:profileData} =useProfile() //carga el perfil del usuario
  const [categories, setCategories] = useState([])
  const [editedCategory, setEditedCategory] = useState(null) //null:new, else category being edited
 
  useEffect(() => {
    fetchCagegories()
  }, [])

  function fetchCagegories(){
    fetch('/api/categories').then(response=>{ //Get del getServerSession desde el servidor
      response.json().then(categories=>{
        setCategories(categories)
      })
    })
  }


  async function handleCategorySubmit(ev){
    ev.preventDefault(); //que no trabaje como lo hacen los formularios por defecto
    const data={name:categoryName}
    console.log('---CATEGORIES PAGE.JS--editedCategory----',editedCategory)
    if(editedCategory) {data._id=editedCategory._id}
    console.log('---CATEGORIES PAGE.JS--data----',data)

      const creationPromise=new Promise(async (resolve,reject)=>{
        const response=await fetch('/api/categories',{
          method:editedCategory?'PUT':'POST',
          body:JSON.stringify(data),
          headers:{'Content-Type':'application/json'}
        })
        setCategoryName("")
        fetchCagegories() //tras grabar una nueva, leo otra vez del fichero
        setEditedCategory(null)
        if (response.ok) {resolve()} else{reject()}
      }) //de la promesas
      await toast.promise(creationPromise,{
        loading:editedCategory?'Updating category...':'Creating your new category...',
        success:editedCategory?'Category updated!':'Category created!',
        error:'Error in category, sorry'
      })
    }
  
async function handleDeleteClick(_id){
  const promise=new Promise(async (resolve,reject)=>{
    const response=await fetch('/api/categories?_id='+_id,{
      method:'DELETE',
      //headers:{'Content-Type':'application/json'}
    })
    if (response.ok) resolve(); else reject()
  })
  await toast.promise(promise,{
    loading:'Deleting category...',
    success:'Category deleted',
    error:'Error deleting category'
  })  
   fetchCagegories()
  }

if (profileLoading) {return 'Loading user info...'} //ok
if (!profileData.admin) {return 'Not an admin'} //ok
  return(
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
    <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory?'Update category':' New category name'}
              {editedCategory && (<>: <b>{editedCategory.name}</b></>)}

             </label>
            <input type="text" value={categoryName} 
            onChange={e=>setCategoryName(e.target.value)}/>
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory?'Update':'Create'}
            </button>
            <button type="button" onClick={()=> {setEditedCategory(null);setCategoryName('')}}>Cancel</button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
    {categories?.length>0 && categories.map(c=>(
      <div key={c._id} className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
        <div className="grow">{c.name}</div>
        <div className="flex">
          <button type="button" onClick={()=>{setEditedCategory(c);setCategoryName(c.name)}}>Edit</button>
           <DeleteButton label="Delete" onDelete={()=>handleDeleteClick(c?._id)} />
        </div>
      </div>
    ))}
      </div>
    </section>
  )
}