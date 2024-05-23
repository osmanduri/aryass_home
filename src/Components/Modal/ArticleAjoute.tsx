import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios'
import {loadStripe} from '@stripe/stripe-js';
interface ArticleAjouteProps {
    element:{
        _id:string;
        nomProduit:string;
        categorie:string;
        prix:number;
        img:[string];
    }
    setShowArticleAjoute:any;
    select:any;
    startPrice:number;
    finalPrice:number;
    value:number;

}


export default function ArticleAjoute({element, setShowArticleAjoute, select, startPrice, finalPrice, value}:ArticleAjouteProps) {
    //@ts-ignore
    const panier = useSelector(state => state.panier.articles)
    //@ts-ignore
    const userRedux = useSelector(state => state.user.userInfo)

    const makeSinglePayment = async () => {
        const products = {
            articles:[{
                _id:element?._id,
                nomProduit:element?.nomProduit,
                categorie:element?.categorie,
                img: element?.img,
                prix:finalPrice ? finalPrice : startPrice,
                prix_quantite:finalPrice * value,
                quantite: value,
                tags:select
            }]
        }

        const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/payment/create-checkout-session`, {
            userId: userRedux ? userRedux._id : "Non Authentifé sur le site",
            products: products,
            prixTotal: finalPrice ? finalPrice : startPrice,
        });
  
        const stripe = await stripePromise;
        const result = await stripe?.redirectToCheckout({
            sessionId: response.data.sessionId,
        });
  
        if (result?.error) {
            alert(result.error.message);
        }else{
          console.log('session id good')
        }
      }
    
  return (
    <div className='bg-white border border-black border-2 text-white p-4 shadow-2xl w-[450px] max-sm:w-[300px]'>
        <h1 className="text-black text-center uppercase text-lg">Article ajouté avec succès !</h1>
        <div className="flex justify-between mt-4 max-sm:gap-4 gap-4">
            <img src={element.img[0]} alt="img_product" className="w-[150px] h-[150px] max-sm:w-[80px] max-sm:h-[80px]"/>
            <div>
                <p className="text-md font-semibold max-sm:text-sm max-sm:font-normal">{element.nomProduit}</p>
                {
                    select.map((e:any, index:number) => {
                        return (
                            <p key={index} className="text-sm font-semibold max-sm:text-sm max-sm:font-normal"><span className="font-bold underline">{e.type}</span> : <span>{e.valeur}</span></p>
                        )
                    })
                }

            </div>
        </div>
        <div className="mt-8">
            <Link to="/panier"><p className="p-2 text-center bg-black text-white cursor-pointer max-sm:p-1">Voir panier<span className="text-white ml-1">{'( '+panier.length+' )'}</span></p></Link>
            <p onClick={makeSinglePayment} className="p-2 text-center bg-black text-white mt-2 cursor-pointer max-sm:p-1">Accèder au paiement</p>
            <p onClick={() => setShowArticleAjoute(false)} className="underline text-center mt-3 cursor-pointer">Continuer les achats</p>
        </div>
        
    </div>
  )
}
