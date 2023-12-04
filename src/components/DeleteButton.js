import { useState } from "react"

export default function DeleteButton({label,onDelete}){
  const [showConfirm, setshowConfirm] = useState(false)

  if (showConfirm) {
    return (
      <>
      <div className="fixed bg-black/80 inset-0 flex h-full items-center justify-center">
       <div className="bg-white p-4 rounded-lg">
          <div>Are you sure you want to delete?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={()=>setshowConfirm(false)}>Cancel</button>
            <button className="primary" type="button" onClick={()=>{onDelete();setshowConfirm(false)}}>Yes,&nbsp;delete?</button>
          </div>
        </div>
      </div>
      </>
    )
  }

  return(
    <button type="button" onClick={()=>setshowConfirm(true)}>{label}</button>

  )
}