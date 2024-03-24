import  { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Quantite from "../Components/Panier/Quantite";
import { motion, AnimatePresence } from 'framer-motion';
import axios from "axios";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../redux/userSlice";

interface singleProductProps {
    _id:string;
    nomProduit:string;
    categorie:string;
    prix:number;
    img:[string];
}

export default function ProductDetails() {
    const [value, setValue] = useState<number>(1);
    const [singleProduct, setSingleProduct] = useState<singleProductProps>()
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const params = useParams()
    //@ts-ignore
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(params)
        const fetchSingleProduct = async () => {
            await axios.get(`http://localhost:5005/api/product/getProductById/${params.choix_categorie}/${params.id}`)
            .then((res:any) =>{
                console.log(res.data)
                setSingleProduct(res.data)
            })
            .catch(err => console.log(err))
        }
        fetchSingleProduct()
    }, [])

    const handleUpdateValue = (choix: string) => {
        if(choix === 'plus'){
            if(value < 10)
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
        const payloadAddBasket = {
            id:singleProduct?._id,
            nomProduit:singleProduct?.nomProduit,
            categorie:singleProduct?.categorie,
            img:singleProduct?.img,
            prix: singleProduct?.prix,
            quantite:value
        }
        try{
          if(user.userInfo){ // si l'utilisateur est connecté on enregistre le panier dans la bdd
            await axios.post(`http://localhost:5005/api/users/panier/add/${user.userInfo._id}`, payloadAddBasket)
            .then((res) => {
              console.log(res.data)
              dispatch(updateSuccess(res.data))
            })
            .catch((err) => console.log(err))
          }else{
            // Ecrire la logique pour stocké dans le localstorage le panier vu que l'user n'est pas authentifié
          }
    
        }catch(err){
          console.log(err)
        }
      }

    if(!singleProduct){
        return null;
    }

    return (
        <div className="bg-[#F3F3F3]">
            
            <div className="container mx-auto my-12 p-8 ">
                <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
                    {/* Left column for images */}
                    <div className="flex flex-col w-[90%]">
                        <img src={singleProduct.img[0]} alt="Produit principal" className="mb-4 cursor-pointer" onClick={() => openImageModal(singleProduct.img[0])} />
                        <div className="flex -mx-2 flex-wrap">
                            {
                                singleProduct.img.map((element, index) => {
                                    if(index === 0) return null
                                    return (
                                        <img src={element} alt="Vue détaillée du produit" className="w-1/5 m-2 cursor-pointer" onClick={() => openImageModal(element)} /> 
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
                        <p className="text-xl font-semibold">{singleProduct.prix+".00"} €</p>
                        <p className="mb-2">Taxes incluses.</p>
  
                        {/* Size selection */}
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4">
                            <p className="font-semibold">Taille</p>
                            <div className="flex gap-4">
                                <button className="border border-black px-6 py-2 max-lp:px-3 max-lp:py-1  rounded-full bg-black text-white">140X190</button>
                                <button className="border border-black px-6 py-2 max-lp:px-3 max-lp:py-1 rounded-full">160X200</button>
                                <button className="border border-black px-6 py-2 max-lp:px-3 max-lp:py-1 rounded-full">180X200</button>
                            </div>
                        </div>
  
                        {/* Mattress selection */}
                        <div className="flex flex-wrap items-center gap-2 mb-4 mt-4">
                            <p className="font-semibold w-full">Taille du Matelas</p>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">NON- SANS MATELAS</button>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">OUI AVEC MATELAS - 20 CM</button>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">OUI AVEC MATELAS - 22 CM</button>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">OUI AVEC MATELAS - 25 CM</button>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">OUI AVEC MATELAS - 27 CM</button>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">OUI AVEC MATELAS - 30 CM</button>
                            <button className="border border-black px-4 py-2 max-lp:px-2 max-lp:py-1 rounded-full">OUI AVEC MATELAS - 32 CM</button>
                            {/* Add more options if necessary */}
                        </div>
  
                        {/* Quantity adjustment */}
                        <div className="flex items-center gap-4 mb-6 mt-14">
                            <p className="font-semibold">Quantité</p>
                            <div className='w-[142px] h-[50px] border border-black flex justify-between items-center'> <FiMinus onClick={() => handleUpdateValue('minus')} className="ml-3" size={10}/><span>{value}</span><FaPlus onClick={() => handleUpdateValue('plus')} size={10} className="mr-3"/> </div>
                        </div>
  
                        {/* Action buttons */}
                        <p onClick={handleAddPanier} className="cursor-pointer bg-black text-white uppercase px-6 py-2 mb-2 w-full hover:bg-white hover:text-black transition duration-300 ease-in-out border-black border">Ajouter au panier</p>
                        <p className="cursor-pointer bg-black text-white uppercase px-6 py-2 mb-2 w-full hover:bg-white hover:text-black transition duration-300 ease-in-out border-black border">Acheter maintenant</p>

                        {/* Description du produit */}
                        <div className="mt-4">
                            <p>Le cadre de lit est la pièce fondamentale de votre literie. Faire le choix d'un modèle de cadre de lit, c'est vous assurer de la stabilité de votre literie et de sa qualité.</p>
                            <p className="mt-2">Ici voici le cadre de lit capitonné 2 places ROMA, économique et élégant, avec son double capitonnage, assure le confort et le style à votre chambre. Le cadre de lit participe ainsi à la décoration de votre chambre. Son aspect esthétique est alors de la plus grande importance.</p>
                            <div className="mt-4">
                                <h2 className="text-xl font-bold">Description du produit:</h2>
                                <ul className="list-disc ml-5 mt-2">
                                    <li>Dimensions disponibles : 140x190, 160x200 et 180x200, au choix avec ou sans sommier, nous avons la taille parfaite pour vous !</li>
                                    <li>Tissu en velours de qualité avec ses détails en strass et sa texture douce.</li>
                                    <li>Le cadre métallique est économique et d'une simplicité extrême, qu'il s'agisse d'un lit simple ou un lit double.</li>
                                    <li>Matelas disponible en plusieurs épaisseurs : 20cm / 22cm / 25cm / 27cm / 30cm / 32cm avec ressorts.</li>
                                    <li>Sommier disponible en plusieurs tailles : 140x190 / 160x200 / 180x200 avec les pieds intégrés.</li>
                                </ul>
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
    );
}
