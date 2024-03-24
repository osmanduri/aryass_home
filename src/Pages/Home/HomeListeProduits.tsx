import ListeProduits from "../Catalogues/ListeProduits"

interface HomeListeProduitsProps {
    titre:string;
}

export default function HomeListeProduits({titre}:HomeListeProduitsProps) {
  return (
    <div className="max-w-[1536px] mx-auto">
    <h1 className="m-2 text-4xl text-black font-semibold max-lp:text-center">{titre}</h1>
    <div className="flex flex-wrap justify-between mt-12 max-lp:justify-center">

    </div>
    <div className="flex justify-center mt-4 cursor-pointer"><p className="text-white bg-black text-center py-3 px-10">Tout afficher</p></div>
  </div>
  )
}
