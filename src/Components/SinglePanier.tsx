import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import Quantite from './Panier/Quantite';

export default function PanierComponent() {
  const [value, setValue] = useState<number>(0)

  const handleUpdateValue = (choix:string) => {
      if(choix === 'plus'){
          if(value < 10)
          setValue(prev => prev +1)
      }else{
          if(value > 0)
          setValue(prev => prev - 1)
      }
  }


  return (
    <div className="flex items-center py-5 max-md:items-start">
    <div className="flex w-3/5"> 
      <img className="h-28" src="/catalogue/canape/canape1.png" alt="canape" />
      <div className="flex flex-col ml-4 gap-1">
        <Link to="/" className="text-lg text-gray-900 font-semibold hover:underline max-sm:text-sm max-sm:w-[80%]">Cadre De Lit Capitonné En Velours - ROMA GRIS</Link>
        <span className="text-md font-semibold max-sm:text-sm max-sm:w-2/5">€599,99</span>
          <p className="text-sm max-sm:text-xs">Taille: 140X190</p>
          <p className="text-sm max-sm:text-xs">Taille du Matelas: NON- SANS MATELAS</p>
          <div className='flex items-center md:hidden'>
              <Quantite value={value} handleUpdateValue={handleUpdateValue}/>
              <FaRegTrashAlt size={20} className='ml-4 cursor-pointer'/>
          </div>
      </div>
    </div>
    <div className="flex justify-start w-1/5 max-md:hidden">
      {/* Quantity adjustment */}
      <div className="flex items-center px-6 py-3 gap-2">
              <Quantite value={value} handleUpdateValue={handleUpdateValue}/>
              <FaRegTrashAlt size={20} className='ml-4 cursor-pointer'/>
      </div>
    </div>
    <span className="text-center w-1/5 font-bold text-sm text-end max-md:w-2/5 max-md:text-md">€599,99</span>
  </div>
  )
}
