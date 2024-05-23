import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import useOutsideClick from './ClickOutside/useOutsideClick';
import { useDispatch  } from 'react-redux';
import { setDispo } from '../../redux/filterSlice';
import { useSelector } from 'react-redux';

interface DropdownPriceProps {
    setIsShowDropDownDispo?: Dispatch<SetStateAction<boolean>>;
    width?:number;
    height?:number;
}

export default function DropdownDispo({ setIsShowDropDownDispo, width, height }: DropdownPriceProps) {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const dispatch = useDispatch();
    //@ts-ignore
    const dispo = useSelector((state) => state.filter.dispo);
    
    //@ts-ignore
    const productDetailsRedux = useSelector((state) => state.filter)

    const style = {
        width:width+'px',
        height:height+'px'
    }

    useEffect(() => {
        setSelectedOptions(dispo || []); // Initialise selectedOptions avec dispo, ou un tableau vide si dispo est null/undefined
      }, [dispo]);
    
    if(setIsShowDropDownDispo) 
    useOutsideClick(dropdownRef, () => setIsShowDropDownDispo(false)); // Permet de fermet le composant lorsque que l'on clique ailleurs

        

    const handleSelection = (option: string) => {
        setSelectedOptions(prev => {
            const newSelectedOptions = prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option];
            
            // Dispatch immédiatement l'action pour mettre à jour l'état global avec les nouvelles options sélectionnées
            dispatch(setDispo(newSelectedOptions));

            return newSelectedOptions;
        });
    };


    // Réinitialiser les sélections
    const handleReset = () => {
        setSelectedOptions([]);
        dispatch(setDispo([]));
    };

    const handleClose = () => {

        if(setIsShowDropDownDispo) setIsShowDropDownDispo(false); // Fermer le dropdown
    }

    return (
        <div ref={dropdownRef} className={`mx-auto bg-white w-[348px] h-[150px] border shadow-md flex flex-col items-center justify-evenly`} style={style}>
            <div className="flex justify-between items-center w-[80%]">
                <p className='text-sm'>{selectedOptions.length} sélectionnés</p>
                <span className='text-sm underline cursor-pointer' onClick={handleReset}>Réinitialiser</span>
            </div>
            
            <div className="h-[1px] w-full bg-black opacity-10"/>
            <div className='flex flex-col items-start w-[80%]'>
                <div className="flex items-center justify-start">
                    <input type="checkbox" id="checkbox-stock" className="cursor-pointer"
                           onChange={() => handleSelection('En stock')}
                           checked={selectedOptions.includes('En stock')} />
                    <label htmlFor="checkbox-stock" className="ml-2">En stock ({productDetailsRedux.nbStock})</label>
                </div>
                <div className="flex items-center">
                    <input type="checkbox" id="checkbox-out-of-stock" className="cursor-pointer"
                           onChange={() => handleSelection('Rupture de stock')}
                           checked={selectedOptions.includes('Rupture de stock')} />
                    <label htmlFor="checkbox-out-of-stock" className="ml-2">Rupture de stock ({productDetailsRedux.nbRuptureStock})</label>
                </div>
            </div>
            <div className=' cursor-pointer' onClick={handleClose}>
                {setIsShowDropDownDispo ? <p className='text-white bg-black text-white px-6 py-1 text-sm'>Fermer</p> : ""}
            </div>
        </div>   
    );
}
