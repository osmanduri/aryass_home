import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SinglePanier from '../Components/SinglePanier';
import { useDispatch, useSelector } from "react-redux";
import { viderPanierRedux } from "../redux/panierSlice";
import { FaRegTrashAlt } from "react-icons/fa";
import {loadStripe} from '@stripe/stripe-js';
import axios from "axios";
import FormulaireLivraison from "../Components/Paypal/FormulaireLivraison";
import useOutsideClick from "./Catalogues/ClickOutside/useOutsideClick";
import { motion } from 'framer-motion';
import { useRef } from "react";
import paypal_logo from '/paypal/paypal.png'

interface PanierItem {
  id: string;
  nomProduit: string;
  categorie: string;
  prix: number;
  quantite: number;
  img: string[];
}

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

export default function Panier() {
    const dispatch = useDispatch()
    //@ts-ignore
    const panierRedux = useSelector(state => state.panier)
    console.log(panierRedux.articles)
    //@ts-ignore
    const userRedux = useSelector(state => state.user.userInfo)
    console.log(userRedux)
    const [totalPrice, setTotalPrice] = useState<number>(0)

    const [showFormulaireLivraisonPaypal, setShowFormulaireLivraisonPaypal] = useState<boolean>(false);
    const modalFormulairePaypal = useRef<HTMLDivElement | null>(null);

    const almaTab = [
        "2 x 769,50 € (sans frais)",
        "3 x 769,50 € (sans frais)",
        "4 x 769,50 € (sans frais)",
        "10 x 769,50 € (sans frais)"
    ]

    const [almaSelect, setAlmaSelect] = useState<string>("")

    const handleViderPanier = () => {
      dispatch(viderPanierRedux())
      
    }
    useEffect(() => {
      window.scrollTo(0, 0);
      
    }, [])

    useEffect(() => {
      // Assurez-vous de remettre le défilement en haut de la page
    
      // Calculer le total du panier
      let total = 0; // Initialisation de la variable total
      panierRedux.articles.forEach((article:any) => {
        total += article.prix * article.quantite; // Calcul du total
      });
      
      setTotalPrice(total); 

      console.log(panierRedux)
      
    }, [panierRedux.articles]);

    const makePayment = async () => {

      const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL_LOCALHOST}/api/payment/create-checkout-session`, {
          userId: userRedux ? userRedux._id : "Non Authentifé sur le site",
          products: panierRedux,
          prixTotal: panierRedux.articles.reduce((somme:number, article:any) => somme + (article.prix * article.quantite), 0) // calcule du prix total
      });

      


      const stripe = await stripePromise;
      const result = await stripe?.redirectToCheckout({
          sessionId: response.data.sessionId,
      });

      if (result?.error) {
          alert(result.error.message);
      }
  };



  useOutsideClick(modalFormulairePaypal, () => setShowFormulaireLivraisonPaypal(false))
  return (
    <>
    <div className="bg-white-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b pb-8">
          <h1 className="text-4xl font-semibold max-sm:text-xl">Votre panier</h1>
          <Link to="/catalogue/lit_coffre" className="underline max-sm:text-sm">
            Continuer les achats
          </Link>
        </div>

        <div className="flex mt-10 mb-5 text-sm font-semibold">
          <p className="text-gray-600 uppercase w-3/5">Produit</p>
          <p className="text-left w-1/5 max-md:hidden">Quantité</p>
          <p className="text-center w-1/5 text-end max-md:w-2/5">Total</p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-black opacity-10"/>

        {/* Product 1 */}
        {
          panierRedux.articles.length > 0 ? (
            panierRedux.articles.map((element: PanierItem, index:number) => (
              <SinglePanier element={element} key={index}/>
            ))
          ) : (
            <p className="max-sm:text-sm p-2 bg-black text-white text-center mt-1">Votre panier est vide.</p>
          )
        }
        




        {/* Repeat for other products */}
        
        {/* Divider */}
        <div className="h-[1px] w-full bg-black opacity-10" />
        <div className="flex items-center mt-4 gap-4 uppercase" ><p  className="w-full flex justify-end underline"><span className="cursor-pointer" onClick={handleViderPanier}>Vider le panier</span></p><FaRegTrashAlt /></div>
        <div className="h-40 mt-20">
            <div className="flex flex-col items-end max-md:items-center">
                <p className="text-lg w-[320px] flex justify-between uppercase">Total estimé:<span className="ml-8 font-bold"> €{totalPrice+".00"} EUR</span></p>
                <div className="border border-black p-4 w-[320px]">
                    <div className="flex justify-between"><p className="alma_font">Alma</p> <p className="hover:bg-black hover:text-white px-1 rounded cursor-pointer" onMouseEnter={() => setAlmaSelect(almaTab[0])}>2x</p><p onMouseEnter={() => setAlmaSelect(almaTab[1])} className="hover:bg-black hover:text-white px-1 rounded cursor-pointer">3x</p><p onMouseEnter={() => setAlmaSelect(almaTab[2])} className="hover:bg-black hover:text-white px-1 rounded cursor-pointer">4x</p><p onMouseEnter={() => setAlmaSelect(almaTab[3])} className="hover:bg-black hover:text-white px-1 rounded cursor-pointer">10x</p></div>
                    <p>{almaSelect}</p>
                </div>
                <p className="text-right text-sm mt-4 w-[320px]">Taxe incluse, <span className="underline hover:decoration-2 cursor-pointer">frais d'expédition</span> et réductions calculés à l'étape du paiement</p>
                <p onClick={makePayment} className="bg-black text-white w-[320px] h-[50px] flex justify-center items-center mt-4 cursor-pointer">Procéder au paiement</p>
    
                {/*<PaypalButton totalPrice={totalPrice}/>*/}

                <p onClick={() => setShowFormulaireLivraisonPaypal(true)} className=" bg-[#FCBB32] text-white w-[320px] h-[50px] flex justify-center items-center mt-6 cursor-pointer"><img className="w-32" src={paypal_logo} alt="paypal_logo"/> </p>

            </div>

        </div>


      </div>
    </div>

    {showFormulaireLivraisonPaypal && panierRedux.articles.length > 0 && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={backdrop}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.5)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalFormulairePaypal}>
            <FormulaireLivraison totalPrice={totalPrice} setShowFormulaireLivraisonPaypal={setShowFormulaireLivraisonPaypal}/>
          </div>
        </motion.div>
      )}
    </>
  );
}
