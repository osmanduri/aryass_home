import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Select, Option } from "@material-tailwind/react";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { ajouterArticleSelonQuantite, supprimerArticle } from '../../redux/panierSlice';
import { Link } from 'react-router-dom';
import Svg from './ChoisirOptions/Svg';

interface ChoisirOptionsProps {
    isDialogOpen:boolean;
    setIsDialogOpen:any;
    element:{
      _id:string;
      nomProduit:string;
      categorie:string;
      prix:number;
      img:[string];
      tags:[];
    }
    setShowArticleAjoute:any;
}



export default function ChoisirOptions({element, isDialogOpen, setIsDialogOpen, setShowArticleAjoute}:ChoisirOptionsProps) {
  
  //@ts-ignore
  const panierRedux = useSelector(state => state.panier)
  const dispatch = useDispatch()
  const [value, setValue] = useState<number>(1)
  const startPrice = element.prix;
  const [finalPrice, setFinalPrice] = useState(startPrice);
  const [select, setSelect] = useState<any>([])
  
  useEffect(() => {
    if (element && element.tags) {
        const defaultTags :any[] = [];
        const typeMap: { [key: string]: any } = {};

        element.tags.forEach((e:any) => {
            if (e.augmentation === 0 && !(e.type in typeMap)) {
                defaultTags.push(e);
                typeMap[e.type] = true; // Marquer le type comme ajouté
            }
        });

        setSelect(defaultTags);
    }
}, [element]);

useEffect(() => {
  if(select.length > 0){
      let augmentation = 0;

      select.forEach((e:any) => {
          augmentation = augmentation + e.augmentation;
      })


      let prix_total = startPrice + augmentation;
      setFinalPrice(prix_total)
  }
  
}, [select])


  const handleUpdateValue = (choix:string) => {
      if(choix === 'plus'){
          if(value < 5)
          setValue(prev => prev + 1)
      }else{
          if(value > 1)
          setValue(prev => prev - 1)
      }
  }

  // Cette fonction sera appelée lorsque l'overlay est cliqué
  const closeOnOverlayClick = (e:any) => {
    if (e.target === e.currentTarget) {
      setIsDialogOpen(false);
    }
  };

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modal = {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { delay: 0.3 } },
  };

  const handleAddPanier = async () => {
    panierRedux.articles.map((e:any) => { // On vérifie si le produit qu'on ajoute dans le panier existe déjà pour le remplacer
      if(element && e._id === element?._id){
          dispatch(supprimerArticle(element._id))
      }
  })
    const payloadAddBasket = {
        _id:element?._id,
        nomProduit:element?.nomProduit,
        categorie:element?.categorie,
        img:element?.img,
        prix: finalPrice,
        quantite:value,
        tags:select
    }
    dispatch(ajouterArticleSelonQuantite(payloadAddBasket))
    setIsDialogOpen(false)
    setShowArticleAjoute(true)
  }
  
  const handleChangeOption = (choixUser:any) => {

    console.log(choixUser)

    let index = select.findIndex((element:any) => element.type === choixUser.type)

    if(index === -1){
        setSelect([...select, choixUser])
    }else{
        let newSelect = [...select]
        newSelect.splice(index, 1)
        newSelect.push(choixUser)
        setSelect([...newSelect])
    }



  }

  const [isOpen, setIsOpen] = useState(false);



  return (
    <>
      <button
        onClick={() => setIsDialogOpen(true)}
        className="">
      </button>

      <AnimatePresence>
        {isDialogOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={closeOnOverlayClick} // Ajouté pour fermer le modal en cliquant à l'extérieur
          >
            <motion.div
              variants={modal}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="relative w-half h-[630px] max-lp:h-[80%] p-8 bg-white rounded-lg shadow-2xl max-lp:overflow-scroll max-lp:m-8"
              onClick={(e) => e.stopPropagation()} // Empêche le clic de fermer le modal lorsque vous cliquez à l'intérieur
            >
            <div className='w-full'>
                <div className='flex items-start max-lp:items-center justify-center max-lp:flex-col p-8 gap-12 max-md:p-4'>
                    <img src={element.img[0]} alt="test" className='border border-black border-2 w-[450px] h-[400px] max-lp:w-[300px] max-lp:h-[300px] max-lp:object-contain'/>
                    <div>
                        <h1 className='text-3xl font-bold mb-4'>{element.nomProduit}</h1>
                        <p className='text-xl font-semibold'>{finalPrice+'.00'} €</p>
                        <p className='text-xs w-[80%]'>Taxes incluses. Frais d'expédition calculés à l'étape de paiement.</p>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4">
                            <div className="flex flex-col gap-1 mt-1" style={(element.categorie !== 'lit_coffre' && element.categorie !== 'lit_cadre')  ? {display:"none"}: {}}>
                            <label className='text-sm ml-1 uppercase font-bold'>Taille</label>
                            <div className="relative" onClick={() => setIsOpen(!open)}>
                            <select
                              className="cursor-pointer appearance-none block w-[200px] bg-transparent border-0 border-b border-gray-300 text-gray-700 py-2 px-1 leading-tight focus:outline-none focus:border-3"
                              onChange={(e) => handleChangeOption(element.tags[parseInt(e.target.value)])}>
                              {
                                element.tags.map((tag:any, index:number) => {
                                  if(tag.type !== "Taille"){
                                    return null; // Utilise null pour les éléments non rendus
                                  }
                                  return (
                                    // Utilise l'index comme clé temporaire, mais il vaut mieux utiliser un identifiant unique si disponible
                                    <option className='' key={tag.id} value={index}>{tag.valeur}</option>
                                  )
                                })
                              }
                            </select>
                            <Svg isOpen={isOpen}/>
                            </div>
                            </div>
                            <div className="flex flex-col gap-1 mt-6" style={(element.categorie !== 'lit_coffre' && element.categorie !== 'lit_cadre') ? {display:"none"}: {}}>
                            <label className='text-sm ml-1 font-bold uppercase'>Choix Matelas</label>
                            <div className="relative" onClick={() => setIsOpen(!open)}>
                            <select
                              className="cursor-pointer appearance-none block w-[200px] bg-transparent border-0 border-b border-gray-300 text-gray-700 py-2 px-1 leading-tight focus:outline-none focus:border-3"
                              onChange={(e) => handleChangeOption(element.tags[parseInt(e.target.value)])}>
                              {
                                element.tags.map((tag:any, index:number) => {
                                  if(tag.type !== "Choix Matelas"){
                                    return null; // Utilise null pour les éléments non rendus
                                  }
                                  return (
                                    // Utilise l'index comme clé temporaire, mais il vaut mieux utiliser un identifiant unique si disponible
                                    <option className='' key={tag.id} value={index}>{tag.valeur}</option>
                                  )
                                })
                              }
                            </select>
                            <Svg isOpen={isOpen}/>
                            </div>
                            </div>
                            <div className="flex flex-col gap-1 mt-6" style={element.categorie !== 'lit_cadre' ? {display:"none"}: {}}>
                            <label className='text-sm ml-1 font-bold uppercase'>Sommier</label>
                            <div className="relative" onClick={() => setIsOpen(!open)}>
                            <select
                              className="cursor-pointer appearance-none block w-[200px] bg-transparent border-0 border-b border-gray-300 text-gray-700 py-2 px-1 leading-tight focus:outline-none focus:border-3"
                              onChange={(e) => handleChangeOption(element.tags[parseInt(e.target.value)])}>
                              {
                                element.tags.map((tag:any, index:number) => {
                                  if(tag.type !== "Sommier"){
                                    return null; // Utilise null pour les éléments non rendus
                                  }
                                  return (
                                    // Utilise l'index comme clé temporaire, mais il vaut mieux utiliser un identifiant unique si disponible
                                    <option className='' key={tag.id} value={index}>{tag.valeur}</option>
                                  )
                                })
                              }
                            </select>
                            <Svg isOpen={isOpen}/>
                            </div>
                            </div>
                            <div className="flex gap-4 mt-4" style={element.categorie !== 'canape' ? {display:"none"}: {}}>
                            <div className="relative" onClick={() => setIsOpen(!open)}>
                            <select
                              className="cursor-pointer appearance-none block w-[200px] bg-transparent border-0 border-b border-gray-300 text-gray-700 py-2 px-1 leading-tight focus:outline-none focus:border-3"
                              onChange={(e) => handleChangeOption(element.tags[parseInt(e.target.value)])}>
                              {
                                element.tags.map((tag:any, index:number) => {
                                  if(tag.type !== "Orientation"){
                                    return null; // Utilise null pour les éléments non rendus
                                  }
                                  return (
                                    // Utilise l'index comme clé temporaire, mais il vaut mieux utiliser un identifiant unique si disponible
                                    <option className='' key={tag.id} value={index}>{tag.valeur}</option>
                                  )
                                })
                              }
                            </select>
                            <Svg isOpen={isOpen}/>
                            </div>
                            </div>

                            <div className="flex items-center gap-4 mb-6 mt-14">
                              <p className="font-semibold">Quantité</p>
                              <div className='w-[142px] h-[50px] border border-black flex justify-between items-center'> <FiMinus  onClick={() => handleUpdateValue('minus')} className="ml-3 cursor-pointer" size={10}/><span>{value}</span><FaPlus onClick={() => handleUpdateValue('plus')} size={10} className="mr-3 cursor-pointer"/> </div>
                            </div>
                            <div className='max-lp:w-full'>
                            <p onClick={handleAddPanier} className="flex justify-center items-center bg-black text-white uppercase px-6 py-2 w-full rounded-full cursor-pointer">Ajouter au panier</p>
                            </div>
                        </div>
                        
                    </div>
                    
                    <div>
                        
                    </div>
                    
                </div>
                <Link to={`/catalogue/${element.categorie}/${element._id}`}><div className='w-full'><p className='text-center hover:underline cursor-pointer'>Afficher tout les details</p></div></Link>
                
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
