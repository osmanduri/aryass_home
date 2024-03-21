import { useState } from "react";
import Quantite from "../Components/Panier/Quantite";

export default function ProductDetails() {
    const [value, setValue] = useState<number>(0)

    const handleUpdateValue = (choix:string) => {
        if(choix === 'plus'){
            if(value < 10)
            setValue(prev => prev +1)
        }else{
            if(value > 0)
            setValue(prev => prev - 1)
        }
    }
    return (
        <div className="bg-[#F3F3F3]">
      <div className="container mx-auto  my-12 p-8 ">
        <div className="grid grid-cols-2 max-sm:flex max-sm:flex-col">
          {/* Left column for images */}
          <div className="flex flex-col w-[90%]">
            <img src="/catalogue/canape/canape1.png" alt="Produit principal" className="mb-4 " />
            <div className="flex -mx-2 flex-wrap">
              <img src="/catalogue/canape/canape1.png" alt="Vue détaillée du produit" className="w-1/5 m-2" />
              <img src="/catalogue/canape/canape1.png" alt="Vue détaillée du produit" className="w-1/5 m-2" />
              <img src="/catalogue/canape/canape1.png" alt="Vue détaillée du produit" className="w-1/5 m-2" />
              <img src="/catalogue/canape/canape1.png" alt="Vue détaillée du produit" className="w-1/5 m-2" />
              {/* Add more thumbnails if necessary */}
            </div>
          </div>
  
          {/* Right column for product details */}
          <div className="flex flex-col">
            <h1 className="text-xs uppercase">Arya's home</h1>
            <h2 className="text-3xl font-bold mb-4">LIT COFFRE - TOKYO GRIS</h2>
            <p className="text-xl font-semibold">€599,99 EUR</p>
            <p className="mb-2">Taxes incluses.</p>
  
            {/* Size selection */}
            <div className="flex flex-col items-start gap-1 mb-4 mt-4">
              <p className="font-semibold">Taille</p>
              <div className="flex gap-4">
              <button className="border border-black px-6 py-2 rounded-full bg-black text-white max-lp:px-4 max-lp:py-2 max-lp:text-sm">140X190</button>
              <button className="border border-black px-6 py-2 rounded-full max-lp:px-4 max-lp:py-2 max-lp:text-sm">160X200</button>
              <button className="border border-black px-6 py-2 rounded-full max-lp:px-4 max-lp:py-2 max-lp:text-sm">180X200</button>
              </div>

            </div>
  
            {/* Mattress selection */}
            <div className="flex flex-wrap items-center gap-2 mb-4 mt-4">
              <p className="font-semibold w-full">Taille du Matelas</p>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">NON- SANS MATELAS</button>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">OUI AVEC MATELAS - 20 CM</button>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">OUI AVEC MATELAS - 22 CM</button>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">OUI AVEC MATELAS - 25 CM</button>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">OUI AVEC MATELAS - 27 CM</button>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">OUI AVEC MATELAS - 30 CM</button>
              <button className="border border-black px-4 py-2 rounded-full max-lp:px-2 max-lp:py-2 max-lp:text-xs">OUI AVEC MATELAS - 32 CM</button>
              {/* Add more options if necessary */}
            </div>
  
            {/* Quantity adjustment */}
            <div className="flex items-center gap-4 mb-6 mt-14">
              <p className="font-semibold">Quantité</p>
                <Quantite handleUpdateValue={handleUpdateValue} value={value}/>
            </div>
  
            {/* Action buttons */}
            <button className="bg-black text-white uppercase px-6 py-2 mb-2 w-full">Ajouter au panier</button>
            <button className="bg-black text-white uppercase px-6 py-2 w-full">Acheter maintenant</button>
            <div>
                <p className="font-bold mt-4">Le cadre de lit est la pièce fondamentale de votre literie. Faire le choix d'un modèle de cadre de lit, c'est vous assurer de la stabilité de votre literie et de sa qualité.</p>
                <p className="mt-4">Ici voici le cadre de lit capitonné 2 places ROMA, économique et élégant, avec son double capitonnage,  assure le confort et le style à votre chambre. Le cadre de lit participe ainsi à la décoration de votre chambre. Son aspect esthétique est alors de la plus grande importance.</p>
                <div className="mt-12">
                    <h1 className="text-3xl font-semibold">Description du produit:</h1>
                    <ul className="ml-5">
                    <li className="list-disc mt-1"> Dimensions disponible : 140x190, 160x200 et 180x200, au choix avec ou sans sommier, nous avons la taille parfaite pour vous ! </li>
                    <li className="list-disc mt-1">Tissu en velours de qualité avec ses détails en strass et sa texture douce</li>
                    <li className="list-disc mt-1">Le cadre métallique est économique et d'une simplicité extrême qu'il s'agisse d'un lit simple ou un lit double.</li>
                    <li className="list-disc mt-1">Matelas disponible en plusieurs épaisseur : 20cm / 22cm / 25cm / 27cm / 30cm / 32cm avec ressort. </li>
                    <li className="list-disc mt-1">Sommier disponible en plusieurs taille : 140x190 / 160x200 / 180x200 avec les pieds intégrés.</li>
                    </ul>
                </div>

                <div className="flex justify-center"><p className=" underline font-bold mt-4 w-[80%] text-center">Il vous offre toutes les opportunités que vous recherchez avec des prix de lit abordables.</p></div>
                <p className="mt-12 text-md">Commencez votre journée joyeusement avec le cadre de lit ROMA qui est un élément indispensable grâce ses conceptions créatives basées sur le confort et la commodité.</p>
            </div>
            <p> -- Share</p>
          </div>
        </div>
      </div>
      </div>
    );
  }
  