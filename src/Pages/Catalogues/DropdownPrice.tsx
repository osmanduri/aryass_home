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
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  //@ts-ignore
  const priceMaxRedux = useSelector((state) => state.filter.priceMaxProduct)



  const style = {
    width:width,
    height:height
  }

  useEffect(() => {
      setMinPrice(minPriceFromRedux)
      setMaxPrice(maxPriceFromRedux)

  }, [minPriceFromRedux, maxPriceFromRedux]); 

  const handleFilterPrice = () => {

      if(!maxPrice){
        setMaxPrice(null)
      }
      if(!minPrice){
        setMinPrice(null)
      }
      dispatch(setPriceMin(minPrice));
      dispatch(setPriceMax(maxPrice));
    

    
    
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
      <p className='text-sm max-lg:w-[80%]'>Le prix le plus élevé est de {priceMaxRedux}€ <span className='text-sm underline cursor-pointer' onClick={resetPrice}>Réinitialiser</span></p>
      <div className="h-[1px] w-full bg-black opacity-10"/>
      <div className='flex items-center gap-2'>
        <span>€</span>
        
        <input type="number" className="p-2 w-[120px] h-[40px] border max-lg:w-[100px]" placeholder='De' id="price_min" value={minPrice} onChange={e => setMinPrice(parseInt(e.target.value))} required/>
        <span>€</span>
        <input type="number" className="p-2 w-[120px] h-[40px] border max-lg:w-[100px]" placeholder="À"  id="price_max" value={maxPrice} onChange={e => setMaxPrice(parseInt(e.target.value))} required />
      </div>
      <p className='text-end bg-black text-white px-6 py-1 text-sm cursor-pointer' onClick={handleFilterPrice}>
        Appliquer
      </p>
    </div>   
  );
}
