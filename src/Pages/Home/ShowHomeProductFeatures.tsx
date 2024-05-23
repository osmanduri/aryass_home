

export default function ShowHomeProductFeatures() {
  return (
    <div className='bg-[#F3F3F3] p-14'>
            <div className='max-w-[1536px] mx-auto '>
        <div className='flex justify-between max-lg:flex-col max-lg:items-center'>
            <img src="/test/1.png" alt="img1" className="w-[276px] h-[526px] max-lg:w-[276px] max-lg:h-[376px]"/>
            <div className='flex flex-col justify-between'>
                <div className='space-y-4'>
                    <h1 className='text-center text-4xl text-black uppercase max-lg:mt-6'>Voir nos produits</h1>
                    <p className='w-[80%] mx-auto text-center'>Créez un espace chaleureux et accueillant, où design et confort se rencontrent pour des moments inoubliables en famille et entre amis.</p>
                    <div className='flex justify-center'><a href="/catalogue/lit_coffre" className='bg-black text-white py-2 px-10 max-lg:mb-6'>Explorez maintenant</a></div>
                </div>
                <div className='flex justify-evenly'>
                    <img src="/test/lit_coffre_1.webp" alt="img1" className='w-[273px] h-[328px] max-lg:w-1/2 max-lg:h-1/2 max-lg:m-2'/>
                    <img src="/test/canape_1.webp" alt="img1" className='w-[273px] h-[328px] max-lg:w-1/2 max-lg:h-1/2 max-lg:m-2'/>
                </div>
            </div>
            <img src="/test/4.png" alt="img1" className="w-[276px] h-[526px] max-lg:w-[276px] max-lg:h-[376px] max-lg:mt-8"/>
        </div>
    </div>
    </div>

  )
}
