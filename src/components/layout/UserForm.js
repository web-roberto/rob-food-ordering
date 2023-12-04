"use client"
import { useState } from "react";
import EditableImage from "@/components/layout/EditableImage";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

export default function UserForm({user,onSave}){
  const [userName, setUserName] = useState(user?.name||"")
  const [image,setImage]=useState(user?.image||"")
  const [phone,setPhone]=useState(user?.phone||"")
  const [streetAddress,setStreetAddress]=useState(user?.streetAddress||"")
  const [postalCode,setPostalCode]=useState(user?.postalCode||"")
  const [city,setCity]=useState(user?.city||"")
  const [country,setCountry]=useState(user?.country||"")
  const [admin,setAdmin]=useState(user?.admin||false)
  const {data:loggedInUserData}= useProfile()

  const addressProps={phone,streetAddress,postalCode,city,country};
  // const setAddressProps={setPhone,setStreetAddress,setPostalCode,setCity,setCountry};
  
  function setAddressProps(propName,value){
    switch(propName){
      case 'phone':setPhone(value); break;
      case 'streetAddress':setStreetAddress(value);break;
      case 'postalCode':setPostalCode(value);break;
      case 'city':setCity(value);break;
      case 'country':setCountry(value);break;
    }
  }

return (
    <>
      <div className="md:flex gap-2">
        <div>
          <div className="p-2 rounded-lg relative max-w-[120px]">
          <EditableImage link={image} setLink={setImage} />
          </div>
        </div>
        <form className="grow" onSubmit={(e)=>onSave(e,{name:userName,image,phone,streetAddress,postalCode,city,country,admin})}>
          <label>First and last name</label>
          <input type="text" placeholder="First and last name" value={userName} 
          onChange={(e)=>setUserName(e.target.value)} />
          <label>Email</label>
          <input type="email" disabled={true} value={user?.email} />    
          <AddressInputs addressProps={addressProps} setAddressProps={setAddressProps} />
            {loggedInUserData.admin &&(
               <div>
               <label className="p-2 inline-flex items-center gap-2 mb-2" htmlFor="adminCb">
                 <input className="" id="adminCb" type="checkbox" checked={admin} value={'1'}
                 onChange={e=>setAdmin(e.target.checked)}/>
                 <span>Admin</span>
               </label>
             </div>
            ) }
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  )
}