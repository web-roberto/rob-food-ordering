"use client"
import { useEffect, useState } from "react";
import {useProfile} from "@/components/UseProfile";
import UserTabs from "@/components/layout/UserTabs";
import toast from 'react-hot-toast';
import Link from "next/link";



export default function UsersPage(){

  const [userName , setUserName] = useState("")
  const {loading,data} =useProfile() //carga el perfil del usuario
  const [users, setUsers] = useState([])
  const [editedUser, setEditedUser] = useState(null) //null:new, else category being edited
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  function fetchUsers(){
    fetch('/api/users').then(response=>{ //Get del getServerSession desde el servidor
      response.json().then(users=>{
        setUsers(users)
        console.log('------USERS SON--users-',users)
      })
    })
  }

  async function handleUserSubmit(ev){
    ev.preventDefault(); //que no trabaje como lo hacen los formularios por defecto
    const data={name:userName}
    if(editedUser) {data._id=editedUser._id}
      const creationPromise=new Promise(async (resolve,reject)=>{
        const response=await fetch('/api/users',{
          method:editedUser?'PUT':'POST',
          body:JSON.stringify(data),
          headers:{'Content-Type':'application/json'}
        })
        setUserName("")
        fetchUsers() //tras grabar una nueva, leo otra vez del fichero
        setEditedUser(null)
        if (response.ok) {resolve()} else{reject()}
      }) //de la promesas
      await toast.promise(creationPromise,{
        loading:editedUser?'Updating user...':'Creating your new user...',
        success:editedUser?'User updated!':'User created!',
        error:'Error in user, sorry'
      })
    }
  
async function handleDeleteClick(_id){
  const promise=new Promise(async (resolve,reject)=>{
    const response=await fetch('/api/users?_id='+_id,{
      method:'DELETE',
      //headers:{'Content-Type':'application/json'}
    })
    if (response.ok) resolve(); else reject()
  })
  await toast.promise(promise,{
    loading:'Deleting user...',
    success:'User deleted',
    error:'Error deleting user'
  })  
   fetchUsers()
  }

if (loading) {return 'Loading user info...'} //ok
 if (!data.admin) {return 'Not an admin'} //ok
 
  return(
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
    <form className="mt-8" onSubmit={handleUserSubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedUser?'Update user':' New user name'}
              {editedUser && (<>: <b>{editedUser.name}</b></>)}

             </label>
            <input type="text" value={userName} 
            onChange={e=>setUserName(e.target.value)}/>
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedUser?'Update':'Create'}
            </button>
            <button type="button" onClick={()=> {setEditedUser(null);setUserName('')}}>Cancel</button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing users</h2>
    {users?.length>0 && users.map(user=>(
      <div key={user._id} className="bg-gray-100 rounded-lg p-1 px-4 mb-2  gap-4 flex items-center">
        {/* <div className="grow">{user.name}</div> */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
          <div className="text-gray-900">
             {!!user.name &&( <span>{user.name}</span>)}
              {!user.name &&( <span className="italic">No name</span>)}
          </div>
              <span className="text-gray-500">{user.email}</span>
        </div>
        <div className="flex">
          <Link className="button" href={'/users/'+user._id}>Edit</Link>
          {/* <button type="button" onClick={()=>{setEditedUser(user);setUserName(user.name)}}>Edit</button>
           <DeleteButton label="Delete" onDelete={()=>handleDeleteClick(user?._id)} /> */}
        </div>
      </div>
    ))}
      </div>
    </section>
  )
}