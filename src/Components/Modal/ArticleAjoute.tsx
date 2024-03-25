import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
interface ArticleAjouteProps {
    element:{
        _id:string;
        nomProduit:string;
        categorie:string;
        prix:number;
        img:[string];
    }
    setShowArticleAjoute:any;

}

export default function ArticleAjoute({element, setShowArticleAjoute}:ArticleAjouteProps) {
    const [panierItemNumber, setPanierItemNumber] = useState<number>(0)
    //@ts-ignore
    const panier = useSelector(state => state.panier.articles)

    useEffect(() => {
        const panierLocalstorage = JSON.parse(localStorage.getItem("panier")!) || [];
        setPanierItemNumber(panierLocalstorage.length)
    },[])
  return (
    <div className='bg-white border border-black border-2 text-white p-4 shadow-2xl w-[450px] max-sm:w-[300px]'>
        <h1 className="text-black text-center uppercase text-lg">Article ajouté avec succès !</h1>
        <div className="flex justify-between mt-4 max-sm:gap-4">
            <img src={element.img[0]} alt="img_product" className="w-[150px] h-[150px] max-sm:w-[80px] max-sm:h-[80px]"/>
            <div>
                <p className="text-md font-semibold max-sm:text-sm max-sm:font-normal">{element.nomProduit}</p>
                <p className="text-sm mt-1 max-sm:text-xs">Taille:140x190</p>
                <p className="text-sm max-sm:text-xs">Sommier:Sans sommier</p>
                <p className="text-sm max-sm:text-xs">Matelat:sans matelat</p>
            </div>
        </div>
        <div className="mt-8">
            <Link to="/panier"><p className="p-2 text-center bg-black text-white cursor-pointer max-sm:p-1">Voir panier<span className="text-white ml-1">{'( '+panier.length+' )'}</span></p></Link>
            <Link to="/"><p className="p-2 text-center bg-black text-white mt-2 cursor-pointer max-sm:p-1">Accèder au paiement</p></Link>
            <p onClick={() => setShowArticleAjoute(false)} className="underline text-center mt-3 cursor-pointer">Continuer les achats</p>
        </div>
        
    </div>
  )
}
