import Trash from "../icons/Trash";
import Plus from "../icons/Plus";
import { useState } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

export default function MenuItemPriceProps({name,addLabel,props, setProps}){
 // const [sizes, setSizes] = useState([]) -> estará en su padre
//console.log('----MenuItemPriceProps----props----',{props})
const [isOpen, setIsOpen] = useState(false)
  function addSize(){
    //console.log('----addSize---sizes.length--- ',sizes?.length)
    setProps(oldSizes =>{
         // console.log('----addSize---oldSizes.length--- ',oldSizes?.length)
    return [...oldSizes,{name:'',price:0}] //añade una fila vacía y despues la edito
    })
  }

function editSize(e,index,prop){
const newValue=e.target.value
setProps(prevSizes=> {
      const newSizes=[...prevSizes];
      newSizes[index][prop]=newValue
      return newSizes;
  })
}
function removeSize(indexToRemove){
  setProps(prev=>prev.filter((value,index)=>index!==indexToRemove))
}

  return(
    <div className="bg-gray-200 p-2 rounded-md mb-2">
      <button className="inline-flex p-1 border-0 justify-start" type="button"
      onClick={()=>setIsOpen(!isOpen)}>
        {isOpen && (<ChevronUp />) }
        {!isOpen && (<ChevronDown />) }
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen?'block':'hidden'}>
        {props?.length>0 && props.map((size,index)=>(
          <div key={size._id} className="flex gap-2 items-end">
            <div>
              <label>Name</label>
              <input type="text" placeholder="Size name" value={props[index].name} onChange={e=>editSize(e,index,'name')}/>
            </div>
            <div>
              <label>Extra price</label>
              <input type="text" placeholder="Extra price" value={props[index].price} onChange={e=>editSize(e,index,'price')}/>
            </div>
            <div>
              <button type="button" className="bg-white mb-2 px-2" 
              onClick={()=>removeSize(index)}><Trash /> </button>
            </div>
          </div>
        ))}
      </div>
    <button type="button" className="bg-white items-center"  onClick={addSize}> <Plus className="w-4 h-4"/>{addLabel}</button>
  </div>
  )
}