import { useState } from 'react';
import { Carousel, IconButton  } from "@material-tailwind/react";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import pencil from '/header/pencil.png'
import phone_header from '/header/phone.png'
import email from '/header/email.png'

export default function Header() {
    const [opacity, setOpacity] = useState(1);

    return (
    <div className='flex justify-center h-[40px] bg-[#101010] absolute w-full z-[999]'>
    <Carousel className="max-w-[1536px]" placeholder={"carousel_header"} navigation={() => false}
         loop={true}
         autoplay={false}
         autoplayDelay={5000}
         transition={{ duration: 0.6  }}
            
          prevArrow={({ handlePrev }) => (
            <IconButton
              placeholder={"bouton_prev"}
              variant="text"
              color="white"
              size="lg"
              onClick={() => {handlePrev(), setOpacity(0), setTimeout(() => {setOpacity(1)}, 400)}}
              className="!absolute top-2/4 left-4 -translate-y-2/4 w-[40px] h-[40px] max-sm:block"
            >
            <GrFormPrevious size={20} className='bg-white rounded'/>
            </IconButton>
          )}
          nextArrow={({ handleNext }) => (
            <IconButton
              placeholder={"bouton_next"}
              variant="text"
              color="white"
              size="lg"
              onClick={() => {handleNext(), setOpacity(0), setTimeout(() => {setOpacity(1)}, 400)}}
              className="!absolute top-2/4 !right-4 -translate-y-2/4 w-[40px] h-[40px] max-sm:block"
            >
            <MdNavigateNext size={20} className='bg-white rounded'/>
            </IconButton>
          )}
    >
        <div className='bg-[#101010] h-full flex items-center justify-center' style={{ opacity: opacity, transition: 'opacity 0.3s ease' }}>
            <div className='flex gap-8 items-center max-sm:gap-4'>
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img src={phone_header} alt="phone" className='w-[20px] h-[20px]'/>
                    <a href="tel:0627024424" className='text-white text-center text-sm font-normal hover:underline transition duration-300 ease-in-out max-sm:text-xs'>06 27 02 44 24</a>
                </div>
                <div className='w-[2px] h-[15px] bg-white' />
                <div className='flex items-center gap-2 cursor-pointer'>
                    <img src={email} alt="phone" className='w-[20px] h-[20px]'/>
                    <a href="mailto:osman.duri@hotmail.fr" className='text-white text-center text-sm font-normal hover:underline transition duration-300 ease-in-out max-sm:text-xs'>aryas_home@gmail.com</a>
                </div>
                <div className='w-[2px] h-[15px] bg-white cursor-pointer max-sm:hidden' />
                <div className='flex items-center gap-2 cursor-pointer max-sm:hidden'>
                    <img src={pencil} alt="phone" className='w-[20px] h-[20px]'/>
                    <p className='text-white text-center text-sm font-normal hover:underline transition duration-300 ease-in-out cursor-pointer max-sm:text-xs'>Nous-contacter</p>
                </div>
            </div>
        </div>
        <div className='bg-[#101010] h-full flex items-center justify-center' style={{ opacity: opacity, transition: 'opacity 0.3s ease' }}>
            <p className='text-white text-center text-sm max-sm:text-xs max-sm:pl-4 max-sm:pr-4'>Livraison offerte en Île-de-France dans un délai de 7 à 10 jours.</p>
        </div>
        <div className='bg-[#101010] h-full flex items-center justify-center' style={{ opacity: opacity, transition: 'opacity 0.3s ease' }}>
            <p className='text-white text-center text-sm max-sm:text-xs max-sm:pl-4 max-sm:pr-4'>Livraison en dehors de l'Île-de-France effectuée dans un délai de 2 à 4 semaines.</p>
        </div>
    </Carousel>
    </div>
  );
}
