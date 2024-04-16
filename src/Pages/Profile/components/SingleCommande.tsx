import SingleCommandeDetails from './SingleCommandeDetails'
import {loadStripe} from '@stripe/stripe-js';
import { useState, useEffect } from 'react';

export default function SingleCommande({element}:any) { 
    const [paymentMethod, setPaymentMethod] = useState<string>('')
    const finaliserReglement = async (sessionId:string) => {
        console.log(sessionId)
        const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
          
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({
            sessionId: sessionId,
        });
  
        if (result?.error) {
            alert(result.error.message);
        }
    };

    useEffect(() => {
        if(element.procedure_paiement === "stripe"){
            setPaymentMethod('Par Carte')
        }
        if(element.procedure_paiement === "paypal"){
            setPaymentMethod('Par Paypal')
        }
    }, [])
  return (
    <div className='border border-black rounded mt-8 max-sm:m-2 max-sm:mt-8'>
        
        <div className='flex justify-between p-4 max-sm:p-2 border-black border-b-2 bg-black '>
            <p className='text-white max-sm:text-sm max-sm:w-[200px]'>Commande effectuée le: {element.date_creation_commande}</p>
            <p className='text-white max-sm:text-sm max-sm:w-[100px]'>Total: {element.prixTotal}.00 €</p>
        </div>
        <div className='p-4 max-sm:p-2'>
            <div className='flex items-center justify-between'>
                <p className='max-sm:text-sm'>{element.panier.length} produits commandé{element.panier.length > 1 ? 's' : ''}</p>
                <p className='max-sm:text-sm uppercase'>{paymentMethod}</p>
            </div>

            {
                element.panier.map((product:any, index:number) => {
                    return (
                        <SingleCommandeDetails product={product} key={index}/>
                    )
                })
                
            }

        </div>
         <div className=' flex justify-between p-4 max-sm:p-2'> 
         <p className=''>Status: {element.status_paiement === "paid" ? "Payé" : "Non Payé"}</p> 
            { element.status_paiement === 'unpaid' && <p className='px-8 py-2 bg-black text-white cursor-pointer max-sm:text-sm max-sm:px-4 max-sm:py-0.5' onClick={() => finaliserReglement(element.session_id)}>Finaliser le paiement</p> }
            
         </div> 
    </div>
  )
}
