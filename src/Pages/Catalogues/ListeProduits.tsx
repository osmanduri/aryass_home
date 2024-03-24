import { motion } from 'framer-motion';
import { Link } from "react-router-dom"
import { useState, useRef } from "react";
import ChoisirOptions from "../../Components/Modal/ChoisirOptions";
import { ajouterArticle } from "../../redux/panierSlice";
import { useDispatch } from "react-redux";
import axios from 'axios'
import { useSelector } from "react-redux";
import { updateSuccess } from "../../redux/userSlice";
import ArticleAjoute from "../../Components/Modal/ArticleAjoute";
import useOutsideClick from './ClickOutside/useOutsideClick';

interface ListeProduitsProps {
  element:{
    _id:string;
    nomProduit:string;
    categorie:string;
    prix:number;
    quantite:number;
    img:[string]
  }
}

// Définition des variantes pour l'animation
const variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

export default function ListeProduits({element}:ListeProduitsProps) {

  const [showArticleAjoute, setShowArticleAjoute] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [onHover, setOnHover] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTag, setIsTag] = useState(false)
  const dispatch = useDispatch()
  //@ts-ignore
  const user = useSelector(state => state.user)

  const handleAddPanier = async () => {
    console.log(element)
    const payloadAddBasket = {
        id:element._id,
        nomProduit:element.nomProduit,
        categorie:element.categorie,
        img:element.img,
        prix: element.prix,
        quantite:1
    }
    try{
      if(user.userInfo){ // si l'utilisateur est connecté on enregistre le panier dans la bdd
        await axios.post(`http://localhost:5005/api/users/panier/add/${user.userInfo._id}`, payloadAddBasket)
        .then((res) => {
          console.log(res.data)
          dispatch(updateSuccess(res.data))
          setShowArticleAjoute(true);
          //setTimeout(() => setShowArticleAjoute(false), 3000); // Masquer après 3 secondes
          
        })
        .catch((err) => console.log(err))
      }else{
        const monObjet = { panier: user.userInfo.panier };
        // Convertit l'objet en chaîne de caractères JSON
        const monObjetEnString = JSON.stringify(monObjet);
        // Stocke l'objet dans localStorage sous la clé 'maCle'
        localStorage.setItem('panier', monObjetEnString);
      }

    }catch(err){
      console.log(err)
    }
  }

    useOutsideClick(modalRef, () => setShowArticleAjoute(false))
  return (
    <>
    
    <div className="mt-12">
    <Link to={`/catalogue/${element.categorie}/${element._id}`} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
    <div className="m-2  shadow-none">
        <div className="zoom_liste_produit relative max-lp:w-[250px] shadow">
            <img src={element.img[0]} alt="categorie_meubles" className='zoom_bit'/>
                { false && <p className='absolute top-1 left-1 border border-black py-1 px-6 bg-white color-black text-sm uppercase'>Promo<span className='text-[orange] ml-1'> 18%</span></p> }
                { false && <p className='absolute top-1 right-1 border border-black py-1 px-6 bg-white color-black text-sm uppercase'>Nouveauté</p>}
                {true && <p className='absolute bottom-1 left-1 border border-black py-1 px-6 bg-white color-black text-sm uppercase'>Epuisé</p>}      
        </div>
        <div className="bg-white p-4 shadow-2xl">
            <p className={"text-sm cursor-pointer"} style={onHover ? {textDecoration:"underline"}:{}}>{element.nomProduit}</p>
            <p className="font-semibold">{element.prix+".00"} €</p>
        </div>
        
    </div>
    </Link>
    {
      !isTag ?
       <p onClick={() => setIsDialogOpen(true)} className="cursor-pointer shadow-none text-center p-4 border border-black w-[300px] max-lp:w-[250px] mx-auto bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out">Choisir des options</p>
       :
       <p onClick={handleAddPanier} className="cursor-pointer shadow-none text-center p-4 border border-black w-[300px] max-lp:w-[250px] mx-auto bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out">Ajouter au panier</p>
    }
   
    </div>
    
    <ChoisirOptions isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} element={element} setShowArticleAjoute={setShowArticleAjoute}/>
          {/* Condition pour afficher ArticleAjoute avec animation */}
          {showArticleAjoute && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalRef}>
            <ArticleAjoute element={element} setShowArticleAjoute={setShowArticleAjoute}/>
          </div>
        </motion.div>
      )}
    </>
  )
}
