"use client"
import Image from "next/image";
import {signIn} from "next-auth/react";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage(){
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
//const [userLoged, setUserLoged] = useState(false)
const [loginInProgress, setLoginInProgress] = useState(false)
//const [error, setError] = useState(false)

async function handleFormSubmit(e){
  e.preventDefault()
  setLoginInProgress(true)
  //console.log('----login----antes signIn---email-',email)
  await signIn('credentials', {email, password, callbackUrl: '/'});
  setLoginInProgress(false)
  }

  return (
  <section className="mt-8">
    <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
     {/* {userLoged && (
      <div className="my-4 text-center">User loged.
      //poner nombre del user
        <br />Now you can{' '}<Link className="underline" href={'/login'}>Login &raquo;</Link> 
      </div>
       )}  
      */}
    {/* // {error && (
    //   <div className="my-4 text-center">UAn error has occurred.<br /> 
    //   Please try it again later</div>
    // )} */}
    <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
      <input type="email" placeholder="email" value={email} onChange={e=> setEmail(e.target.value)}
      disabled={loginInProgress}
      />
      <input type="password" placeholder="password" value={password} onChange={e=> setPassword(e.target.value)}
      disabled={loginInProgress}/>
      <button type="submit" disabled={loginInProgress}>Login</button>
      <div className="my-4 text-center text-gray-500">
        or login with provider
      </div>
        <button  type="button" onClick={()=> signIn('google',{callbackUrl:'/'})} className="flex gap-4 justify-center border-t pt-4">
          <Image src={'/google.png'} alt={''} width={24} height={24}/>
          Login with google</button>
      {/* <div className="text-center my-4 text-gray-500">Create an account?{' '}
      <Link className="underline" href={'/register'}>Register here &raquo;</Link>
      </div> */}
    </form>
    

  </section>   
  )
}