"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}){
  const path=usePathname()
  //console.log('---UserTabs---path--',path)
  return (
    <div className="flex gap-2 tabs mx-auto justify-center flex-wrap">
      <Link className={path==='/profile'?'active':''} href={'/profile'}>Profile</Link>
      {isAdmin &&(
        <>
          <Link  className={path==='/categories'?'active':''} href={'/categories'}>Categories</Link>
          {/* Tanto para /menu-items como para /menu-items/new: */}
          <Link  className={path.includes('menu-items')?'active':''} href={'/menu-items'}>Menu Items</Link>
          {/* <Link  className={path==='/menu-items'?'active':''} href={'/menu-items'}>Menu Items</Link> */}
          <Link  className={path.includes('users')?'active':''} href={'/users'}>Users</Link>
        </>
      )}
      {/* Se muestra sea Admin o no */}
      <Link  className={path==='/orders'?'active':''} href={'/orders'}>Orders</Link>

  </div>
  )
}