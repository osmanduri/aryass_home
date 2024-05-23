import { Link } from "react-router-dom";

interface HomeListeProduitsProps {
    titre:string;
    categorie:any;
    link:string;
}

export default function HomeListeProduits({titre, categorie, link}: HomeListeProduitsProps) {
  console.log(categorie)
  return (
    <div className="max-w-[1536px] mx-auto">
      <h1 className="m-2 text-4xl text-black font-semibold text-center lg:text-left">{titre}</h1>
      <div className="flex flex-wrap mt-12 justify-center lg:justify-start">
        {
          categorie.map((element: any, index: number) => {
            return (
              <div key={index} className="mt-0 md:w-1/3 sm:w-1/2 xs:w-full p-2">
                <Link to={`/catalogue/${element.categorie}/${element._id}`}>
                  <div className="shadow-2xl w-full relative">
                    <div className="zoom_liste_produit overflow-hidden relative sm:pb-[78.25%] max-xs:w-[100%] max-xs:h-[250px]">
                      <img src={element.img[0]} alt="categorie_meubles" className="absolute top-0 left-0 w-full h-full object-fill"/>
                      {true && <p className='absolute top-2 left-2 py-2 px-8 bg-black text-white text-xs uppercase'>Promo</p>}
                    </div>
                    <div className="bg-white p-4 shadow-2xl h-[90px]">
                      <p className="text-md cursor-pointer overflow-hidden max-sm:w-[259px] max-md:text-sm">{element.nomProduit}</p>
                      <p className="text-lg font-semibold max-lp:text-sm">{`${element.prix}.00 €`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            )
          })
        }
      </div>
      { categorie && <div className="flex justify-center mt-4 cursor-pointer"><p className="text-white bg-black text-center py-3 px-10"><Link to={link}>Tout afficher</Link></p></div>}
    </div>
  )
}

