import { useDispatch } from "react-redux"
import { resetState } from "../../redux/filterSlice"
export default function AucunProduitTrouvé() {
    const dispatch = useDispatch()
    const handleDeleteAllFilter = () => {
        dispatch(resetState())
    }
  return (
    <div className="flex flex-col items-center w-full gap-3 mt-8">
        <p className="text-2xl text-center w-full font-bold max-sm:text-xl max-sm:font-bold">Aucun Produit Trouvé</p>
        <p className="text-lg font-semibold hover:underline cursor-pointer max-sm:text-lg" onClick={handleDeleteAllFilter}>Voulez-vous supprimer tous les filtres ?</p>
    </div>
  )
}
