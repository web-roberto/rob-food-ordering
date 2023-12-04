import toast from 'react-hot-toast';
import Image from "next/image";


export default function EditableImage({link,setLink}){

  async function handleFileChange(e){
    //console.log('----handleFileChange---e--',e)
    const files=e.target.files
    if (files?.length===1) {
      const data=new FormData;
      data.set('file',files[0])
      const uploadingPromise= fetch('/api/upload',{
          method:'POST',
          body:data,
          //headers:{'Content-Type':'multipart/form-data',}
        }).then(response=>{
          if (response.ok) {
            return response.json().then(link=>{
              setLink(link)})
          }
          throw new Error('Something went wrong')
      })
      //lo mismo que antes
      await toast.promise(uploadingPromise,{
        loading:'Uploading...',
        success:'Image uploaded!',
        error:'Upload error'
      })
  }
  }
  return (
    <>
    {link &&(
      <Image className="rounded-lg w-full h-full mb-2" src={link} width={250} height={250} alt={'avatar'}/>
    )}
    {!link &&(
      <div className='text-center bg-gray-200 p-4 text-gray-400 rounded-lg mb-1'>No image</div>
    )}
   <label>
     <input type="file" className="hidden" onChange={handleFileChange}/>
     <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
   </label>
   </>
  )
}