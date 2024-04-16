import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import SingleCommande from '../components/SingleCommande'
import { setPayeOuNonPaye } from '../../../redux/filterSlice'



export default function Commandes() {
    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)
    //@ts-ignore
    const payeOuNonPaye = useSelector(state => state.filter.payeOuNonPaye)
    const [commandeUser, setCommandeUser] = useState([])
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [notFound, setNotFound] = useState<string>('')

    const dispatch = useDispatch()

    useEffect(() => {
        //dispatch(resetState())
        setCommandeUser([])
        const fetchCommandeUser = async () => {
            try {
                const res = await axios.post(`http://localhost:5005/api/commande/getCommandByUser/${user._id}`, { payeOuNonPaye });
                setCommandeUser(res.data);
                console.log(res.data)
            } catch (err) {
                console.error(err);
                //@ts-ignore
                setNotFound(err.response.data.message)
                setCommandeUser([])
                
            } 
        };
    
        fetchCommandeUser();
    }, [payeOuNonPaye]);

    

    const handleSelection = (option: string) => {
        setSelectedOptions(prev => {
            const newSelectedOptions = prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option];
            
            // Dispatch immédiatement l'action pour mettre à jour l'état global avec les nouvelles options sélectionnées
            dispatch(setPayeOuNonPaye(newSelectedOptions));

            return newSelectedOptions;
        });
    };



  return (
    <div className='max-w-[900px] mx-auto'>
        <h1 className='text-2xl uppercase text-center mt-12 underline max-sm:text-lg'>Historique des commandes</h1>
        <div className='flex justify-between m-2'>
        <p className='max-sm:text-sm'>Filtre :</p>
        <div className='flex items-center gap-2'>
            <div className="flex items-center justify-start">
                        <input type="checkbox" id="checkbox-stock" className="cursor-pointer"
                            onChange={() => handleSelection('paid')}
                            checked={selectedOptions.includes('paid')} />
                        <label htmlFor="checkbox-stock" className="ml-2 max-sm:text-sm">Payé</label>
            </div>
            <div className="flex items-center">
                        <input type="checkbox" id="checkbox-out-of-stock" className="cursor-pointer"
                            onChange={() => handleSelection('unpaid')}
                            checked={selectedOptions.includes('unpaid')} />
                        <label htmlFor="checkbox-out-of-stock" className="ml-2 max-sm:text-sm">Non Payé</label>
            </div>
        </div>
        

        </div>

        {
           commandeUser.length > 0 ? commandeUser.map((element:any, index:number) => {
                return (
                    <SingleCommande element={element} key={index}/>
                )
            })
            : <p className='mt-12 text-center text-2xl max-sm:text-lg'>{notFound}</p>
        }
    </div>
  )
}
