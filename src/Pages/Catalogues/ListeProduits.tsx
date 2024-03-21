
export default function ListeProduits() {



  return (
    <div className="m-2 w-[300px] max-lp:w-[250px]">
        <div className="zoom_liste_produit relative shadow-none">
            <img src={`/catalogue/canape/canape1.png`} alt="categorie_meubles" className='zoom_bit'/>
                { false && <p className='absolute top-1 left-1 border border-black py-1 px-6 bg-white color-black text-sm uppercase'>promo<span className='text-[orange] ml-1'> 18%</span></p> }
                { false && <p className='absolute top-1 right-1 border border-black py-1 px-6 bg-white color-black text-sm uppercase'>Nouveauté</p>}
                {false && <p className='absolute bottom-1 left-1 border border-black py-1 px-6 bg-white color-black text-sm uppercase'>epuisé</p>}      
        </div>
        <div className="">
            <p className={"text-sm hover:underline cursor-pointer"}>Cadre De Lit Capitonné En Velours - ROMA BEIGE</p>
            <p className="font-semibold">499 £</p>
        </div>
    </div>
  )
}
