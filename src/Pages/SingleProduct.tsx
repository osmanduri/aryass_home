import  { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ajouterArticleSelonQuantite, supprimerArticle } from "../redux/panierSlice";
import ArticleAjoute from "../Components/Modal/ArticleAjoute";
import Taille from "../Components/TagsComponent/Taille";
import ChoixMatelat from "../Components/TagsComponent/ChoixMatelat";
import StyleCanape from "../Components/TagsComponent/StyleCanape";
import useOutsideClick from './Catalogues/ClickOutside/useOutsideClick';
import Sommier from "../Components/TagsComponent/Sommier";
import Couchage from "../Components/TagsComponent/Couchage";
import {loadStripe} from '@stripe/stripe-js';


interface singleProductProps {
    _id:string;
    nomProduit:string;
    categorie:string;
    prix:number;
    img:[string];
    tags:any;
    description:string;
    caracteristique:string;
    fiche_technique:[string];
}

interface choixUser {
    _id:string;
    tagId:string;
    categorie:string;
    type:string;
    augmentation:number;
    valeur:string;
}

// Définition des variantes pour l'animation
const variants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

export default function ProductDetails() {
    //@ts-ignore
    const panierRedux = useSelector(state => state.panier)
    //@ts-ignore
    const userRedux = useSelector(state => state.user.userInfo)
    const [showArticleAjoute, setShowArticleAjoute] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const [value, setValue] = useState<number>(1);
    const [singleProduct, setSingleProduct] = useState<singleProductProps>()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const params = useParams()
    //@ts-ignore
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    // State pour calculer les prix
    const [startPrice, setStartPrice] = useState<number>(0);
    const [finalPrice, setFinalPrice] = useState<number>(0);

    const [select, setSelect] = useState<any>([])

    useOutsideClick(modalRef, () => setShowArticleAjoute(false))

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        const fetchSingleProduct = async () => {
            await axios.get(`${import.meta.env.VITE_BASE_URL_PROD}/api/product/getProductById/${params.choix_categorie}/${params.id}`)
            .then((res:any) =>{
                console.log(res.data)
                setSingleProduct(res.data)
                setStartPrice(res.data.prix)
                
            })
            .catch(err => console.log(err))
        }
        fetchSingleProduct()
    }, [])


    useEffect(() => {
        if (!singleProduct?.tags) return;
    
        const typeMap: { [key: string]: any } = {};
    
        singleProduct.tags.forEach((tag: any) => {
            const existingTag = typeMap[tag.type];
            // Si le type n'est pas encore dans typeMap ou si l'augmentation actuelle est inférieure à celle enregistrée
            if (!existingTag || tag.augmentation < existingTag.augmentation) {
                typeMap[tag.type] = tag; // Stocker le tag avec la plus petite augmentation
            }
        });
    
        const minimalAugmentationTags = Object.values(typeMap); // Extraire les valeurs de typeMap
        setSelect(minimalAugmentationTags);
    
    }, [singleProduct]);

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

      const handleChangeOption = (choixUser:choixUser) => {
        console.log(choixUser)
        let index = select.findIndex((element:any) => element.type === choixUser.type)

        console.log(index)

        if(index === -1){
            setSelect([...select, choixUser])
        }else{
            let newSelect = [...select]
            newSelect.splice(index, 1)
            newSelect.push(choixUser)
            setSelect([...newSelect])
        }
      }
    
    const handleUpdateValue = (choix: string) => {
        if(choix === 'plus'){
            if(value < 5)
            setValue(prev => prev +1)
        }else{
            if(value > 1)
            setValue(prev => prev - 1)
        }
    };

    const openImageModal = (imageSrc: string) => {
        setSelectedImage(imageSrc);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleAddPanier = async () => {
        panierRedux.articles.map((e:any) => { // On vérifie si le produit qu'on ajoute dans le panier existe déjà pour le remplacer
            if(singleProduct && e._id === singleProduct?._id){
                dispatch(supprimerArticle(singleProduct._id))
            }
        })
        const payloadAddBasket = {
            _id: singleProduct?._id,
            nomProduit: singleProduct?.nomProduit,
            categorie: singleProduct?.categorie,
            img: singleProduct?.img,
            prix: finalPrice ? finalPrice : startPrice,
            prix_quantite:finalPrice * value,
            quantite: value,
            tags:select
        }

       
        dispatch(ajouterArticleSelonQuantite(payloadAddBasket))
        setShowArticleAjoute(true)
      }

      const makeSinglePayment = async () => {
        const products = {
            articles:[{
                _id:singleProduct?._id,
                nomProduit:singleProduct?.nomProduit,
                categorie:singleProduct?.categorie,
                img: singleProduct?.img,
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

      if (!singleProduct) return <p className="text-center">Aucun Produit...</p>


      
    return (
        <>
        <div className="bg-[#F3F3F3]">
            
            <div className="container mx-auto p-8 ">
                <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
                    {/* Left column for images */}
                    <div className="flex flex-col w-[95%]">
                        <img src={singleProduct.img[0]} alt="Produit principal" className="mb-4 cursor-pointer w-full h-[400px] max-sm:h-[200px]" onClick={() => openImageModal(singleProduct.img[0])} />
                        <div className="flex -mx-2 flex-wrap">
                            {
                                singleProduct.img.map((element, index) => {
                                    if(index === 0) return null
                                    return (
                                        <img key={index} src={element} alt="Vue détaillée du produit" className="w-1/5 h-[90px] m-2 cursor-pointer max-sm:h-[60px]" onClick={() => openImageModal(element)} /> 
                                    )
                                })
                            }
                            {/* Add more thumbnails if necessary */}
                        </div>
                    </div>
  
                    {/* Right column for product details */}
                    <div className="flex flex-col">
                        <h1 className="text-xs uppercase">Arya's home</h1>
                        <h2 className="text-3xl font-bold mb-4">{singleProduct.nomProduit}</h2>
                        <p className="text-xl font-semibold">{finalPrice ? finalPrice+".00" : startPrice+".00"} €</p>
                        <p className="mb-2">Taxes incluses.</p>
  
                        {/* Size selection */}
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'lit_coffre' && singleProduct.categorie !== 'lit_cadre' && singleProduct.categorie !== 'lit_coffre_une_place' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Taille') && <Taille options={singleProduct.tags.filter((tag:any) => tag.type === "Taille")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'lit_coffre' && singleProduct.categorie !== 'lit_cadre' && singleProduct.categorie !== 'lit_coffre_une_place' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Choix Matelas') && <ChoixMatelat options={singleProduct.tags.filter((tag:any) => tag.type === "Choix Matelas")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'lit_cadre' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Sommier') && <Sommier options={singleProduct.tags.filter((tag:any) => tag.type === "Sommier")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'canape' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Orientation') && <StyleCanape  options={singleProduct.tags.filter((tag:any) => tag.type === "Orientation")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'matelas_sommier' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Couchage') && <Couchage  options={singleProduct.tags.filter((tag:any) => tag.type === "Couchage")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>

                        {/* Quantity adjustment */}
                        <div className="flex items-center gap-4 mb-6 mt-14">
                            <p className="font-semibold">Quantité</p>
                            <div className='w-[142px] h-[50px] border border-black flex justify-between items-center'> <FiMinus onClick={() => handleUpdateValue('minus')} className="ml-3 cursor-pointer" size={10}/><span>{value}</span><FaPlus onClick={() => handleUpdateValue('plus')} size={10} className="mr-3 cursor-pointer"/> </div>
                        </div>
  
                        {/* Action buttons */}
                        <p onClick={handleAddPanier} className="cursor-pointer bg-black text-white uppercase px-6 py-2 mb-2 w-full hover:bg-white hover:text-black transition duration-300 ease-in-out border-black border">Ajouter au panier</p>
                        <p onClick={makeSinglePayment} className="cursor-pointer bg-black text-white uppercase px-6 py-2 mb-2 w-full hover:bg-white hover:text-black transition duration-300 ease-in-out border-black border">Acheter maintenant</p>

                        {/* Description du produit */}
                        <div className="mt-4">
                                <h2 className="text-xl font-bold">Description du produit:</h2>
                            <p className="leading-8">{singleProduct.description}</p>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">Caractéristique du produit:</h2>
                                <ul className="list-disc ml-5 mt-2">
                                {   

                                    singleProduct.fiche_technique?.map((e:string, index:number) => {
                                        return (
                                            <li className="mt-1" key={index}>{e}</li>
                                        )
                                    })
                                }
                                </ul>
                                
                                <p className="leading-8">  {singleProduct.caracteristique}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for zooming in on images */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}>
                        <motion.img src={selectedImage} alt="Zoomed In Product"
                            className=" max-sm:w-[80%]"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0}} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
          {showArticleAjoute && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalRef}>
            <ArticleAjoute element={singleProduct} setShowArticleAjoute={setShowArticleAjoute} select={select} startPrice={startPrice} finalPrice={finalPrice} value={value}/>
          </div>
        </motion.div>
      )}
        </>
    );
}
