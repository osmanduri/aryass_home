import { useEffect, useRef } from 'react';
import axios from 'axios' // je vais utiliser ça dans le futur pour effectuer ma requete dans mongo
import { useDispatch, useSelector } from 'react-redux';
import { viderPanierRedux } from '../../redux/panierSlice';

declare global {
  interface Window {
    paypal: any; // Utilisez "any" ou une définition de type plus spécifique si disponible
  }
}

interface PaypalButtonProps {
    totalPrice:number;
    formState:{
        nom: string;
        prenom: string;
        email: string;
        telephone: string;
        adresse: string;
        ville: string;
        codePostal: string;
    }

}

export default function PaypalButton({totalPrice, formState}:PaypalButtonProps) {
    const dispatch = useDispatch()
    const formStateRef = useRef(formState);
    formStateRef.current = formState; // Toujours garder la référence à jour
    //@ts-ignore
    const panier = useSelector(state => state.panier.articles)
    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)

  useEffect(() => {
    // S'assure que le SDK de PayPal est chargé avant de tenter de rendre les boutons
    if (window.paypal && totalPrice) {
      window.paypal.Buttons({
        style: {
            layout: 'horizontal', // ou 'horizontal'
            color: 'gold',     // ou 'gold', 'silver', 'white', 'black'
            shape: 'pill',     // ou 'pill'
            label: 'paypal',   // 'checkout' pour le bouton Checkout avec PayPal uniquement
            tagline:false
          },
          //@ts-ignore
        createOrder: (data:any, actions:any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'EUR',
                value: 40
              }
            }],
          });
        },
        //@ts-ignore
        onApprove: (data:any, actions:any) => {
          return actions.order.capture().then((details:any) => {
            console.log('Payment Successful!', details);

            if(details.status === "COMPLETED"){
                //Sauvegarder la commande dans la base de donnée

                // Et redirection vers une page 
                const payload = {
                    user_id: user ? user._id : 'utilisateur non authentifié',
                    nomComplet: formStateRef.current.nom + ' ' + formStateRef.current.prenom,
                    prenom:formStateRef.current.prenom,
                    nom:formStateRef.current.nom,
                    email: formStateRef.current.email,
                    articles:panier,
                    prixTotal: totalPrice,
                    adresse: formStateRef.current.adresse,
                    ville: formStateRef.current.ville,
                    codePostal: formStateRef.current.codePostal,
                    telephone: formStateRef.current.telephone,
                    monnaie:"EUR",
                    status_paiement:"paid",
                    procedure_paiement:"paypal",
                    invoice_number:"UUIDDDDD"
                }
                
                console.log('Le paiement est passé nous pouvons ajouté la commande dans mongo !')

                const sendDataToServer = async () => {
                    axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/commande/new/`, payload)
                    .then((res) => {
                        console.log(res.data)
                        
                        
                            axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/facture/convertHandlebarsToPdf`, payload) // send invoice
                            .then((result) => {
                              dispatch(viderPanierRedux())
                              console.log(result.data)
                              window.location.href = "/payment_success"
                            })
                            .catch(error => {
                              console.log(error)
                              
                            })
                        
                    })
                    .catch(err => {
                        console.log(err)
                    }) 
                }

                sendDataToServer();
            }

          });
        },
        onError: (err:any) => {
          console.error('Error during the payment process!', err);
          alert('An error occurred during the payment process.');
        }
      }).render('#paypal-button-container');
    } else {
      console.log('PayPal SDK not loaded');
    }
  }, [totalPrice]);

  return (
    <div>
      <div id="paypal-button-container" className='w-[320px] h-[50px] mt-4 max-sm:w-[273px] max-sm:h-[30px]'>
      </div> {/* Le bouton PayPal sera rendu ici  <img className="w-8" src="/loading/loading.gif" alt="loading"/> */}
      
    </div>
  );
}
