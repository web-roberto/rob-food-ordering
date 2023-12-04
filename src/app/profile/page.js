"use client"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import UserTabs from "@/components/layout/UserTabs";
import UserForm from "@/components/layout/UserForm";

export default function ProfilePage(){
  const session=useSession()
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileFetched, setProfileFetched] = useState(false)
  const {status}=session;

  useEffect(() => {
   fetchUser()
  }, [session,status])//si cambia el usuario cambia session, con el mismo usuairo state cambia.
  
  useEffect(() => {
    fetchUser()
  }, [])//

  function fetchUser(){
    if (status==='authenticated'){
      fetch('/api/profile').then(response=>{ //GET del fichero de User con el {email} de la session activa
        response.json().then(data=>{
          //console.log('-----PROFILE-PAGE-leido--/api/profile---data:',data)
          setUser(data)
          setIsAdmin( data?.admin||false)
          setProfileFetched(true)
        })})
    }
  }

 async function handleProfileInfoUpdate(e,data){
    e.preventDefault();
    //TOAST CON PROMESA 
    const savingPromise=new Promise(async(resolve,reject)=>{
      // el fecth normal envuelto por un promise y un resolve/reject final
      const response=await fetch('/api/profile',{
        method:'PUT',
        body:JSON.stringify(data),
        headers:{'Content-Type':'application/json'}
      })
      if (response.ok) {resolve()} else {reject()};
    })
    //el 
    await toast.promise(savingPromise,{
      loading:'Saving...',
      success:'Profile saved!',
      error:'Error'
    })
  }

  //no se vea 1º profile y después el resto de tabs, añado el "|| !profileFetched"
  //pq avece esta a loading y no queremos que se muestre 
  if (status==='loading' || !profileFetched) {return 'Loading...'} 
  if (status==='unauthenticated') {return redirect('/login')}

  return(
    <>
      <section className="mt-8">
        <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate}/>
      </div>
      </section>
    </>
  )
}