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

interface singleProductProps {
    _id:string;
    nomProduit:string;
    categorie:string;
    prix:number;
    img:[string];
    tags:any;
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

    useEffect(() => {
        const fetchSingleProduct = async () => {
            await axios.get(`http://localhost:5005/api/product/getProductById/${params.choix_categorie}/${params.id}`)
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
        if (singleProduct && singleProduct.tags) {
            const defaultTags :any[] = [];
            const typeMap: { [key: string]: any } = {};
    
            singleProduct.tags.forEach((e:any) => {
                if (e.augmentation === 0 && !(e.type in typeMap)) {
                    defaultTags.push(e);
                    typeMap[e.type] = true; // Marquer le type comme ajouté
                }
            });
    
            setSelect(defaultTags);
        }
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
            prix: finalPrice,
            quantite: value,
            tags:select
        }

       
        dispatch(ajouterArticleSelonQuantite(payloadAddBasket))
        setShowArticleAjoute(true)
      }

      if (!singleProduct) return <p>Loading...</p>;

    return (
        <>
        <div className="bg-[#F3F3F3]">
            
            <div className="container mx-auto p-8 ">
                <div className="grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col">
                    {/* Left column for images */}
                    <div className="flex flex-col w-[95%]">
                        <img src={singleProduct.img[0]} alt="Produit principal" className="mb-4 cursor-pointer w-full h-[500px]" onClick={() => openImageModal(singleProduct.img[0])} />
                        <div className="flex -mx-2 flex-wrap">
                            {
                                singleProduct.img.map((element, index) => {
                                    if(index === 0) return null
                                    return (
                                        <img key={index} src={element} alt="Vue détaillée du produit" className="w-1/5 h-[120px] m-2 cursor-pointer" onClick={() => openImageModal(element)} /> 
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
                        <p className="text-xl font-semibold">{finalPrice+".00"} €</p>
                        <p className="mb-2">Taxes incluses.</p>
  
                        {/* Size selection */}
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'lit_coffre' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'taille') && <Taille options={singleProduct.tags.filter((tag:any) => tag.type === "taille")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'lit_coffre' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Choix Matelat') && <ChoixMatelat options={singleProduct.tags.filter((tag:any) => tag.type === "Choix Matelat")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>
                        <div className="flex flex-col items-start gap-1 mb-4 mt-4" style={singleProduct.categorie !== 'canape' ? {display:"none"}: {}}>
                            {
                               singleProduct.tags.length > 0 && singleProduct.tags.find((element:any) => element.type === 'Orientation') && <StyleCanape  options={singleProduct.tags.filter((tag:any) => tag.type === "Orientation")} handleChangeOption={handleChangeOption} select={select}/>
                            }
                        </div>

                        {/* Quantity adjustment */}
                        <div className="flex items-center gap-4 mb-6 mt-14">
                            <p className="font-semibold">Quantité</p>
                            <div className='w-[142px] h-[50px] border border-black flex justify-between items-center'> <FiMinus onClick={() => handleUpdateValue('minus')} className="ml-3 cursor-pointer" size={10}/><span>{value}</span><FaPlus onClick={() => handleUpdateValue('plus')} size={10} className="mr-3 cursor-pointer"/> </div>
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
          {showArticleAjoute && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalRef}>
            <ArticleAjoute element={singleProduct} setShowArticleAjoute={setShowArticleAjoute}/>
          </div>
        </motion.div>
      )}
        </>
    );
}
