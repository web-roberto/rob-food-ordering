//parte SERVIDOR (el node de next)
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import uniqid from 'uniqid'

export async function POST(req){
  const data=await req.formData() //extarigor el fromData del req llamando a esta función
 // console.log('--POST---data-',data)
  if(data.get('file')){
    //si tengo el fichero, lo subo a S3
    const file=data.get('file')
    const s3Client= new S3Client({
      region:'eu-west-1',
      credentials:{
        accessKeyId:process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY,
      }
    })

    // const ext=file.name.split('.') -> ['ni_nombre'],['jpg'] y slice(-1) coge el último
    const ext=file.name.split('.').slice(-1)[0] //coge el 'jpg' de dentro del ['jpg']
    const newFileName='a'+uniqid()+'.'+ext;
    //console.log('-----------newFileName-----',newFileName)
    //leo el stream (Datos binario de la image repartidos en chunks)
    const chunks=[]
    for await (const chunk of file.stream()){
      chunks.push(chunk)
    }
    //console.log('-----------chunks-----',chunks)

    const bucket="rob-food-ordering"
    const buffer=Buffer.concat(chunks);
    //console.log('-----------buffer-----',buffer)
    //console.log('-----------file.type-----',file.type)

    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL:'public-read',
      ContentType: file.type, //se asigna automáticamente
      Body: buffer,
    }))
    const link=`https://${bucket}.s3.amazonaws.com/${newFileName}`
    //console.log('-----------link-----',link)
  
    return Response.json(link)

  }
return Response.json(true)
}