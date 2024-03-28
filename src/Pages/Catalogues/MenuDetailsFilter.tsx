import { useSelector, useDispatch } from 'react-redux';
import { RxCross1 } from "react-icons/rx";
import { setDispo, setPriceMin, setPriceMax, resetState } from '../../redux/filterSlice';

export default function MenuDetailsFilter() {
    //@ts-ignore
    const filter = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    const handleRemoveDispo = (choix: string) => {
        const newDispo = filter.dispo.filter((item: string) => item !== choix);
        dispatch(setDispo(newDispo));
    };

    const handleRemovePriceFilter = () => {
        // Ajustez ici pour réinitialiser les filtres de prix selon les besoins de votre application
        dispatch(setPriceMin(null));
        dispatch(setPriceMax(null));
    };

    const handleResetFilter = () => {
        dispatch(resetState())
    }

    return (
        <>
            <div className='flex items-center mt-8 gap-4 max-sm:flex-col max-sm:items-start'>
                {filter.dispo.includes('En stock') && (
                    <div className='flex items-center justify-center border border-black py-1 px-4 rounded-full text-sm text-black gap-2 cursor-pointer' onClick={() => handleRemoveDispo('En stock')}>
                        Disponibilité: En stock
                        <RxCross1 size={12}/>
                    </div>
                )}
                {filter.dispo.includes('Rupture de stock') && (
                    <div className='flex items-center justify-center border border-black py-1 px-4 rounded-full text-sm text-black gap-2 cursor-pointer' onClick={() => handleRemoveDispo('Rupture de stock')}>
                        Disponibilité: En Rupture de stock
                        <RxCross1 size={12}/>
                    </div>
                )}
                {/* Gère explicitement la condition pour afficher la div même si priceMin est 0 */}
                {(filter.priceMin !== null && filter.priceMax !== null) && (
                <div className='flex items-center justify-center border border-black py-1 px-4 rounded-full text-sm text-black gap-2'>
                    {filter.priceMin ?? '0'} € - {filter.priceMax ? `${filter.priceMax} €` : 'Non spécifié'}
                    <RxCross1 size={12} className='cursor-pointer' onClick={handleRemovePriceFilter}/>
                </div>
                )}
                { (filter.dispo.includes('En stock') || filter.dispo.includes('Rupture de stock') || filter.priceMin !== null || filter.priceMax !== null) && <div className='text-sm font-semibold underline decoration-2 cursor-pointer uppercase' onClick={handleResetFilter}>Tout supprimer</div> }
            </div>
        </>
    );
}
