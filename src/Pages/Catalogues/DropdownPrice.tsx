import { useRef, useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { setPriceMin, setPriceMax } from '../../redux/filterSlice';
import useOutsideClick from './ClickOutside/useOutsideClick';
import { useSelector } from 'react-redux';



interface DropdownPriceProps {
    setIsShowDropDownPrice?: Dispatch<SetStateAction<boolean>>;
    width?:number;
    height?:number;
}

export default function DropdownPrice({ setIsShowDropDownPrice, width, height }: DropdownPriceProps) {
  //@ts-ignore
  const minPriceFromRedux = useSelector((state) => state.filter.priceMin);
  //@ts-ignore
  const maxPriceFromRedux = useSelector((state) => state.filter.priceMax);
  const [minPrice, setMinPrice] = useState<number>(minPriceFromRedux || 0);
  const [maxPrice, setMaxPrice] = useState<number>(maxPriceFromRedux || 0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();

  const style = {
    width:width,
    height:height
  }

  useEffect(() => {
    // Accéder directement aux éléments du DOM pour définir leur valeur
    const priceMinInput = document.getElementById('price_min') as HTMLInputElement;
    const priceMaxInput = document.getElementById('price_max') as HTMLInputElement;

    if (priceMinInput) priceMinInput.value = minPriceFromRedux?.toString() || '';
    if (priceMaxInput) priceMaxInput.value = maxPriceFromRedux?.toString() || '';
  }, [minPriceFromRedux, maxPriceFromRedux]); // Dépendances à minPriceFromRedux et maxPriceFromRedux

  const handleFilterPrice = () => {
    // Utiliser les valeurs des inputs pour dispatcher les actions
    const priceMin = document.getElementById('price_min') as HTMLInputElement;
    const priceMax = document.getElementById('price_max') as HTMLInputElement;

    if (priceMin && priceMax) {
      dispatch(setPriceMin(Number(priceMin.value)));
      dispatch(setPriceMax(Number(priceMax.value)));
    }
    
    if(setIsShowDropDownPrice) setIsShowDropDownPrice(false); // Fermer le dropdown
  };

  if(setIsShowDropDownPrice) 
  useOutsideClick(dropdownRef, () => setIsShowDropDownPrice(false)); // Permet de fermet le composant lorsque que l'on clique ailleurs

  const resetPrice = () => {
    dispatch(setPriceMax(null))
    dispatch(setPriceMin(null))
  }


  return (
    <div ref={dropdownRef} className='mx-auto bg-white w-[348px] h-[150px] border shadow-md flex flex-col items-center justify-evenly' style={style}>
      <p className='text-sm max-lg:w-[80%]'>Le prix le plus élevé est de 1.599,99€ <span className='text-sm underline cursor-pointer' onClick={resetPrice}>Réinitialiser</span></p>
      <div className="h-[1px] w-full bg-black opacity-10"/>
      <div className='flex items-center gap-2'>
        <span>€</span>
        <input type="number" className="p-2 w-[120px] h-[40px] border max-lg:w-[100px]" placeholder='De' id="price_min" onChange={e => setMinPrice(Number(e.target.value))} required/>
        <span>€</span>
        <input type="number" className="p-2 w-[120px] h-[40px] border max-lg:w-[100px]" placeholder="À"  id="price_max" onChange={e => setMaxPrice(Number(e.target.value))} required />
      </div>
      <p className='text-end bg-black text-white px-6 py-1 text-sm cursor-pointer' onClick={handleFilterPrice}>
        Appliquer
      </p>
    </div>   
  );
}
