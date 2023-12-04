"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";
import {useProfile} from "@/components/UseProfile"


export default function EditUserPage(){
 // const session=useSession()
  const {loading,data} =useProfile()
  const {id} = useParams(); //users/[id]
  const [user, setUser] = useState(null)
  //const [isAdmin, setIsAdmin] = useState(false)
  //const [profileFetched, setProfileFetched] = useState(false)
  //const {status}=session;

  useEffect(() => {
    fetchUser()
  }, [])//

  function fetchUser(){
      fetch('/api/profile?_id='+id).then(response=>{ //GET del fichero de User con el {email} de la session activa
        response.json().then(user=>{
          setUser(user)
          console.log('....users/id/page..GET  UNO ..',user?._id)
        //  setMenuItem(item[0])    
        })})
  }

  

 async function handleSaveButtonClick(e,data){
    e.preventDefault();
    //TOAST CON PROMESA 
    const savingPromise=new Promise(async(resolve,reject)=>{
      // el fecth normal envuelto por un promise y un resolve/reject final
      const response=await fetch('/api/profile',{
        method:'PUT',
        body:JSON.stringify({...data,_id:id}),
        headers:{'Content-Type':'application/json'}
      })
      if (response.ok) {resolve()} else {reject()};
    })
    //el 
    await toast.promise(savingPromise,{
      loading:'Saving user...',
      success:'User saved!',
      error:'Error occurred while saving user'
    })
  }

  //no se vea 1º profile y después el resto de tabs, añado el "|| !profileFetched"
  //pq avece esta a loading y no queremos que se muestre 
  if (loading) return 'Loading user profile...';
  if (!data.admin) return 'Not an admin'

  return(
    <>
      <section className="mt-8">
        <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleSaveButtonClick}/>
      </div>
      </section>
    </>
  )
}