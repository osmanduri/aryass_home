import { motion } from 'framer-motion';
import { Link } from "react-router-dom"
import { useState, useEffect, useRef } from "react";
import ChoisirOptions from "../../Components/Modal/ChoisirOptions";
import { ajouterArticle } from '../../redux/panierSlice';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ArticleAjoute from "../../Components/Modal/ArticleAjoute";
import useOutsideClick from './ClickOutside/useOutsideClick';

interface ListeProduitsProps {
  element:{
    _id:string;
    nomProduit:string;
    categorie:string;
    prix:number;
    prix_barre:number;
    quantite:number;
    img:[string];
    tags:any;
    dispo:string;
    promo:boolean;
    object_fit:string;
  },
  index:number;
}

// Définition des variantes pour l'animation
const variants = {
  hidden: { y: -100, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};


const zoomFadeVariants = {
  visible: (custom:any) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: custom * 0.1, duration: 0.5, ease: "easeOut" }
  }),
  hidden: {
    scale: 0.95,
    opacity: 0,
  }
};

export default function ListeProduits({element, index}:ListeProduitsProps) {
  const [showArticleAjoute, setShowArticleAjoute] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [onHover, setOnHover] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useDispatch()
  //@ts-ignore
  const user = useSelector(state => state.user)
  //@ts-ignore
  const panier = useSelector(state => state.panier)
  const [select, setSelect] = useState<any>([])
  const [value, setValue] = useState<number>(1)
  const startPrice = element.prix;
  const [finalPrice, setFinalPrice] = useState(startPrice);
  const [showPartirDe, setShowPartirDe] = useState<boolean>(false)
  console.log(element.object_fit)

  useEffect(() => {
    let monBool = false;
    element.tags.forEach((e:any) => {
      if(e.augmentation !== 0){
        monBool = true
      }
    })
    setShowPartirDe(monBool)
  }, [element])

  const handleAddPanier = async () => {
    const payloadAddBasket = {
        _id:element._id,
        nomProduit:element.nomProduit,
        categorie:element.categorie,
        img:element.img,
        prix: element.prix,
        prix_quantite:element.prix,
        quantite:1,
        tags:[]
    }
    

    dispatch(ajouterArticle(payloadAddBasket))
    setShowArticleAjoute(true);
  }
    useOutsideClick(modalRef, () => setShowArticleAjoute(false))
  return (
    <>
    
    <div className="mt-12 md:w-1/3 sm:w-1/2 xs:w-full p-2 ">
    <motion.div
      variants={zoomFadeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      custom={index} // Assurez-vous de passer l'index si vous l'avez dans les props
    >
  {element.dispo === "En stock" ? (
    <>
    <Link to={`/catalogue/${element.categorie}/${element._id}`} onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)}>
      <div className="shadow-2xl w-full relative">
        <div className="zoom_liste_produit overflow-hidden relative sm:pb-[65.25%] max-xs:w-[100%] max-xs:h-[250px]">
          <img src={element.img[0]} alt="categorie_meubles" className="absolute top-0 left-0 w-full h-full" style={{ objectFit: element.object_fit === "cover" ? "cover" : "fill" }} />
          {element.promo === true && <p className='absolute top-2 left-2 py-2 px-8 bg-black text-white text-xs uppercase'>Promo</p>}
        </div>
        <div className="bg-white p-4 shadow-2xl h-[90px]" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.3)" }}>
          <p className="text-md font-bold cursor-pointer overflow-hidden max-sm:w-[259px] max-lg:text-sm" style={onHover ? {textDecoration:"underline"}:{}}>{element.nomProduit}</p>
          <div className="text-md font-normal max-lp:text-sm"><p className='text-[red]'>{showPartirDe ? "A partir de" : ""}  {`${element.prix}.00 €`}<span className='ml-1 line-through'>{` ${element.prix_barre ? element.prix_barre + ".00 €" : ""}`}</span></p></div>
        </div>
      </div>
    </Link>
    {element.tags.length > 0 ? (
    <p onClick={() => setIsDialogOpen(true)} className="cursor-pointer shadow-none text-center p-4 border border-black w-full mx-auto bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out max-sm:text-sm max-lg:text-xs">Choisir des options</p>
  ) : (
    <p onClick={handleAddPanier} className="cursor-pointer shadow-none text-center p-4 border border-black w-full mx-auto bg-black text-white hover:bg-white hover:text-black transition duration-300 ease-in-out max-sm:text-sm">Ajouter au panier</p>
  )}
    </>
  ) 
  : 
  (
    <div onMouseEnter={() => setOnHover(true)} onMouseLeave={() => setOnHover(false)} className="shadow w-full relative cursor-normal">
      <div className="zoom_liste_produit overflow-hidden relative sm:pb-[78.25%] max-xs:w-[100%] max-xs:h-[250px]">
        <img src={element.img[0]} alt="categorie_meubles" className="absolute top-0 left-0 w-full h-full object-fill brightness-75"/>
        <p className='absolute bottom-2 left-2 py-2 px-8 bg-[red] text-white text-xs uppercase'>Épuisé</p>
      </div>
      <div className="bg-white p-4 shadow-2xl h-[90px]">
        <p className="text-md overflow-hidden max-sm:w-[259px]">{element.nomProduit}</p>
        <p className="text-lg font-semibold max-lp:text-sm">{`${element.prix}.00 €`}</p>
      </div>
      <p className="shadow-none text-center p-4 border border-black w-full mx-auto bg-black text-white max-sm:text-sm">Epuisé</p>
    </div>
  )}
</motion.div>

</div>

    
    <ChoisirOptions isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} element={element} setShowArticleAjoute={setShowArticleAjoute} select={select} setSelect={setSelect} startPrice={startPrice} finalPrice={finalPrice} setFinalPrice={setFinalPrice} value={value} setValue={setValue}/>
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
            <ArticleAjoute element={element} setShowArticleAjoute={setShowArticleAjoute} select={select} startPrice={startPrice} finalPrice={finalPrice} value={value}/>
          </div>
        </motion.div>
      )}
    </>
  )
}
