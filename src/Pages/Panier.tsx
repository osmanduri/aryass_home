import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import SinglePanier from '../Components/SinglePanier';
import paypal_logo from '/paypal/paypal.png'
import { useDispatch, useSelector } from "react-redux";
import { viderPanier } from "../redux/panierSlice";
import axios from 'axios'
import { updateSuccess } from "../redux/userSlice";

export default function Panier() {
  //@ts-ignore

    //@ts-ignore
    const user = useSelector(state => state.user)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [panier, setPanier] = useState([])
    const dispatch = useDispatch()
    const almaTab = [
        "2 x 769,50 € (sans frais)",
        "3 x 769,50 € (sans frais)",
        "4 x 769,50 € (sans frais)",
        "10 x 769,50 € (sans frais)"
    ]

    const [almaSelect, setAlmaSelect] = useState<string>("")

    const handleViderPanier = () => {
      dispatch(viderPanier())
    }

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
      let somme = 0;
      const fetchPanierUser = async () => {
        await axios.get(`http://localhost:5005/api/users/getUserById/${user.userInfo._id}`)
        .then((res:any) => {
          console.log(res.data.panier)
          setPanier(res.data.panier)
          //dispatch(updateSuccess(res.data))
        })
        .catch(err => console.log(err))
      }

      if(user.userInfo){
        fetchPanierUser();

        user.userInfo.panier.forEach((element:any) => {
        somme = somme + (element.prix * element.quantite)
        })
        setTotalPrice(somme)
      }
    }, [user])

    if(!panier){
      return null
    }

  return (
    <div className="bg-white-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b pb-8">
          <h1 className="text-4xl font-semibold max-sm:text-xl">Votre panier</h1>
          <Link to="/" className="underline max-sm:text-sm">
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
          panier?.map((element:any, index:number) => {
            return (
              <SinglePanier element={element} key={index}/>
            )
          })
        }
        




        {/* Repeat for other products */}
        
        {/* Divider */}
        <div className="h-[1px] w-full bg-black opacity-10" />
        { user?.userInfo?.panier.length === 0 && <p className="max-sm:text-sm p-2 bg-black text-white text-center mt-1">Votre panier est vide</p> }
        <div className="h-40 mt-20">
            <div className="flex flex-col items-end max-md:items-center">
                <p className="text-lg w-[320px] flex justify-between">Total estimé:<span className="ml-8" onClick={handleViderPanier}> €{totalPrice+".00"} EUR</span></p>
                <div className="border border-black p-4 w-[320px]">
                    <div className="flex justify-between"><p className="alma_font">Alma</p> <p className="hover:bg-black hover:text-white px-1 rounded cursor-pointer" onMouseEnter={() => setAlmaSelect(almaTab[0])}>2x</p><p onMouseEnter={() => setAlmaSelect(almaTab[1])} className="hover:bg-black hover:text-white px-1 rounded cursor-pointer">3x</p><p onMouseEnter={() => setAlmaSelect(almaTab[2])} className="hover:bg-black hover:text-white px-1 rounded cursor-pointer">4x</p><p onMouseEnter={() => setAlmaSelect(almaTab[3])} className="hover:bg-black hover:text-white px-1 rounded cursor-pointer">10x</p></div>
                    <p>{almaSelect}</p>
                </div>
                <p className="text-right text-sm mt-4 w-[320px]">Taxe incluse, <span className="underline hover:decoration-2 cursor-pointer">frais d'expédition</span> et réductions calculés à l'étape du paiement</p>
                <p className=" bg-black text-white w-[320px] h-[50px] flex justify-center items-center mt-4 cursor-pointer">Procéder au paiement</p>
                <p className=" bg-[#FCBB32] text-white w-[320px] h-[50px] flex justify-center items-center mt-6 cursor-pointer"><img className="w-32" src={paypal_logo} alt="paypal_logo"/> </p> 
            </div>

        </div>


      </div>
    </div>
  );
}