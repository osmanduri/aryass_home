import {useState} from 'react'
import { MdArrowRightAlt } from "react-icons/md";
import { Link } from 'react-router-dom';

interface CardsHomeProps {
    element : {
        name:string;
        img:string;
        url:string;
    }
}

export default function CardsHome({element}:CardsHomeProps) {
    const [isUnderline, setIsUnderline] = useState<boolean>(false)
    const [arrowSize, setArrowSize] = useState<number>(20)

    const handleChangeHoverImage = (choix:boolean) => {
        if(choix){
            setIsUnderline(true)
            setArrowSize(25)
        }else{
            setIsUnderline(false)
            setArrowSize(20)
        }
    }
    console.log(element.url)
  return (
    <div className='mb-8'>
        <Link to={element.url}>
    <div className="zoom relative w-[300px] h-[300px] max-sm:w-[250px] max-sm:h-[250px]" onMouseEnter={() => handleChangeHoverImage(true)} onMouseLeave={() => handleChangeHoverImage(false)}>
        {/* Conteneur pour le texte avec dégradé comme arrière-plan */}
        <div className='text-container absolute z-10 w-full h-32 flex items-center justify-center top-1/2 -translate-y-1/2 bg-[rgba(255,255,255,0.5)]'>
            <p className='text-black text-2xl text-center font-light uppercase'>{element.name}</p>
        </div>
        <img src={`/cards_home/${element.img}`} alt="categorie_meubles" className='zoom_bit '/>
    </div>
    <div className='mt-4 flex items-center gap-2'>
        <p className={`ml-2 uppercase ${isUnderline ? 'underline' : ''}`}>{element.name}</p>
        <MdArrowRightAlt size={arrowSize}/>
    </div>
        </Link>
    </div>
  );
}
