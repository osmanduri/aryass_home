import { useState } from 'react';
import { motion } from 'framer-motion';
import { RxCross1 } from "react-icons/rx";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import DropdownTrier from './DropdownTrier';
import DropdownDispo from './DropdownDispo';
import DropdownPrice from './DropdownPrice';
import { useDispatch } from 'react-redux';
import { resetState } from '../../redux/filterSlice';

const sidebarVariants = {
    hidden: {
      x: '100%', // Se déplace vers la droite pour se cacher
      opacity: 0,
      transition: { duration: 0.5 } // Ajustez cette durée selon vos besoins
    },
    visible: {
      x: 0, // Retour à la position initiale
      opacity: 1,
      transition: { duration: 0.3 } // Mis à jour pour enlever 'type' et 'stiffness' non nécessaires ici
    }
};

interface SidebarFilterProps {
    closeSidebar: () => void;
    nbProduct:number;
}

export default function SidebarFilter({ closeSidebar, nbProduct }:SidebarFilterProps) {
    const dispatch = useDispatch()
    const [showDispoDetails, setShowDispoDetails] = useState<string>('main')

    const handleChoice = (choix:string) => {
        if(choix === "dispo"){
            setShowDispoDetails('dispo')
        }else if(choix === "price"){
            setShowDispoDetails("price")
        }else if(choix === 'main'){
            setShowDispoDetails("main")
        }
    }

    const handleResetFilter = () => {
        dispatch(resetState())
    }

    return (
        <motion.div
          className="sidebar"
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            position: 'fixed',
            right: '0',
            top: 0,
            width: '300px',
            height: '100%',
            backgroundColor: 'white',
            boxShadow: '0px 0 5px rgba(0,0,0,0.5)',
            padding: '0px',
            boxSizing: 'border-box',
            zIndex: '999'
          }}
        >

          <div className=''>
            <div className='flex flex-col items-center p-2 relative'>
                <p className='text-sm text-black'>Filtrer et trier</p>
                <p className='text-sm'>{nbProduct} Produits</p>
                <RxCross1 size={25} className="absolute top-0 right-5 h-full cursor-pointer" onClick={closeSidebar}/>
            </div>
            <div className="h-[1px] w-full bg-black opacity-10"/>
            {
                showDispoDetails === "main" &&
            <div className='p-4 flex flex-col justify-center gap-8 mt-6'>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => handleChoice('dispo')}>
                    <p>Disponibilité:</p>
                    <FaLongArrowAltRight size={22} />
                </div>
                <div className='flex justify-between items-center cursor-pointer' onClick={() => handleChoice('price')}>
                    <p>Prix:</p>
                    <FaLongArrowAltRight size={22} />
                </div>
                <div className='flex justify-between items-center cursor-pointer'>
                    <DropdownTrier width={195}/>
                </div>
            </div>
            
            }
            {
                showDispoDetails === "dispo" && 
                <div>
                    <div className='p-4 gap-8 flex cursor-pointer' onClick={() => handleChoice('main')}>
                        <FaLongArrowAltLeft size={22} />
                        <p>Disponibilité:</p>
                    </div>
                    <DropdownDispo width={270} height={200}/>
                </div>
            }
            {
                showDispoDetails === "price" && 
                <div>
                    <div className='p-4 gap-8 flex cursor-pointer' onClick={() => handleChoice('main')}>
                        <FaLongArrowAltLeft size={22} />
                        <p>Prix:</p>
                    </div>
                    <DropdownPrice width={270} height={200}/>
                </div>
            }
                <div className='fixed bottom-0 p-8 w-full'>
                    <div className='flex justify-center w-full cursor-pointer' >
                        <p className='text-white px-8 py-2 bg-black' onClick={handleResetFilter}>Tout supprimer</p>
                    </div>
                </div>
          </div>
          
          {/* Insérez ici les composants ou éléments de filtrage */}
        </motion.div>
      );
}
