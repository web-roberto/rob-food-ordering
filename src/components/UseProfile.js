
import { useEffect, useState } from "react";

export function useProfile(){
const [data, setData] = useState(false)
  //true para que este mensaje machaque el otro ..Loading
 const [loading, setLoading] = useState(true)
 //voy a la BDD a leer y ver si es Admin
useEffect(() => {
  setLoading(true)
  fetch('/api/profile').then(response=>{ //Get del getServerSession desde el servidor
    response.json().then(data=>{
      setData(data)
     // console.log('-------useProfile---- fetch------data',{data})
      setLoading(false)

    })
  })
}, [])

return {loading,data}

}

