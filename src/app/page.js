import Hero from '@/components/layout/Hero'
import HomeMenu from '@/components/layout/HomeMenu'
import SectionHeaders from '@/components/layout/SectionHeaders'

export default function Home() {
  return (
    <>
       <Hero />
       <HomeMenu />
       <section className='text-center my-16' id="about">
           <SectionHeaders subHeader={'Our story'} mainHeader={'About us'}/>
           <div className=' text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4'>
              <p>
                Velit nisi sint pariatur sunt quis nulla magna cupidatat aute. Fugiat sit occaecat velit sunt dolor pariatur id aliquip pariatur enim ex. Do eu exercitation reprehenderit est sit sit deserunt sunt. Nostrud exercitation do nisi commodo cillum et aliquip id pariatur minim et. Consequat consequat veniam ea quis consectetur ut officia culpa elit. In aliqua velit cupidatat amet excepteur irure exercitation dolor sunt quis exercitation. Proident deserunt laborum sit eiusmod incididunt incididunt dolor duis anim nisi anim sit nulla nostrud.
              </p>
              <p>
                Velit nisi sint pariatur sunt quis nulla magna cupidatat aute. Fugiat sit occaecat velit sunt dolor pariatur id aliquip pariatur enim ex. Do eu exercitation reprehenderit est sit sit deserunt sunt. Nostrud exercitation do nisi commodo cillum et aliquip id pariatur minim et. Consequat consequat veniam ea quis consectetur ut officia culpa elit. In aliqua velit cupidatat amet excepteur irure exercitation dolor sunt quis exercitation. Proident deserunt laborum sit eiusmod incididunt incididunt dolor duis anim nisi anim sit nulla nostrud.
              </p>
              <p>s
                Velit nisi sint pariatur sunt quis nulla magna cupidatat aute. 
                Fugiat sit occaecat velit sunt dolor pariatur id aliquip pariatur enim ex. 
              </p>
           </div>
       </section>
       <section className='text-center my-8' id="contact">
           <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
           <div className='mt-8'>
              <a href="tel:+1234567987" className='text-4xl underline text-gray-500 mt-8'>+1 234 567 987</a>
           </div>
       </section>
      
    </>
  )
}
