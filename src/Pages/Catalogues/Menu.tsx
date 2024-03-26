import  {useState, useEffect} from 'react'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DropdownPrice from './DropdownPrice';
import DropdownDispo from './DropdownDispo';
//import DropdownCategorie from './DropdownCategorie';
import { IoFilterOutline } from "react-icons/io5";
import SidebarFilter from './SidebarFilter';
import { AnimatePresence } from 'framer-motion';
import DropdownTrier from './DropdownTrier';

interface MenuProps {
  nbProduct:number;
}

export default function Menu({nbProduct}:MenuProps) {
  const [isShowDropDownPrice, setIsShowDropDownPrice] = useState<boolean>(false)
  const [isShowDropDownDispo, setIsShowDropDownDispo] = useState<boolean>(false)
  //const [isShowDropDownCategorie, setIsShowDropDownCategorie] = useState<boolean>(false)
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleShowDropDownMenuListeProduit = (choix:string) => {
    switch(choix){
      case 'categorie':{
        //setIsShowDropDownCategorie(true)
        setIsShowDropDownDispo(false)
        setIsShowDropDownPrice(false)
        break;
      }
      case 'dispo':{
        //setIsShowDropDownCategorie(false)
        setIsShowDropDownDispo(true)
        setIsShowDropDownPrice(false)
        break;
      }
      case 'price':{
        //setIsShowDropDownCategorie(false)
        setIsShowDropDownDispo(false)
        setIsShowDropDownPrice(true)
        break;
      }
    }
  }

  const showBurgerFilter = () => {
    if(window.innerWidth <= 990){
      setShowFilterMenu(true)
    }
    else if(window.innerWidth > 990){
      setShowFilterMenu(false)
    }
  }

  useEffect(() => {
    const handleResize = () => showBurgerFilter();
    window.addEventListener('resize', handleResize);

    // Appel initial pour définir l'état correct au montage du composant
    showBurgerFilter();

    // Nettoyage de l'écouteur d'événement au démontage du composant
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  

  const closeSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <>
    {
    !showFilterMenu ? <div className="flex justify-between items-center">
      
        <div className="flex gap-8">
            <p className="mr-12 font-normal text-base">Filtre:</p>
          
           {/* <div className='relative'>
            <div className="cursor-pointer flex items-center font-normal text-sm gap-1"   onClick={() => handleShowDropDownMenuListeProduit('categorie')}>Categorie<div><MdOutlineKeyboardArrowDown/></div></div>
              <div className='absolute z-50 top-8'>
                  {isShowDropDownCategorie && <DropdownCategorie/>}
              </div>
            </div> */}

            <div className='relative'>
            <div className="cursor-pointer flex items-center font-normal text-sm gap-1" onClick={() => handleShowDropDownMenuListeProduit('dispo')}>Disponibilité<div><MdOutlineKeyboardArrowDown/></div></div>
              <div className='absolute z-50 top-8'>
                {isShowDropDownDispo && <DropdownDispo setIsShowDropDownDispo={setIsShowDropDownDispo}/>}
              </div>
            </div>

            <div className='relative'>
            <div className="cursor-pointer flex items-center font-normal text-sm gap-1" onClick={() => handleShowDropDownMenuListeProduit('price')}>Prix<div><MdOutlineKeyboardArrowDown/></div></div>
              <div className='absolute z-50 top-8'>
              { isShowDropDownPrice && <DropdownPrice setIsShowDropDownPrice={setIsShowDropDownPrice}/> }
              </div>
            </div>

        </div>
        <DropdownTrier width={276}/>
        <span className="text-sm">{nbProduct} produits</span>
    </div> :
    <div className='flex justify-between items-center'>
      <div className='flex gap-2 items-center'>
        <IoFilterOutline onClick={closeSidebar} className='cursor-pointer'/>
        <p className='font-normal text-base'>Filtre:</p>
        <AnimatePresence>
          {isSidebarOpen && <SidebarFilter closeSidebar={closeSidebar} nbProduct={nbProduct}/>}
        </AnimatePresence>
        
      </div>
      <span className="text-sm">{nbProduct} produits</span>
    </div>
    }
    </>
  )
}
