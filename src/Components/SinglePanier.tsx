import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { increaseArticle, decreaseArticle, supprimerArticle } from '../redux/panierSlice';

export default function PanierComponent({element}:any) {
  //@ts-ignore
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
      //const panier = useSelector((state) => state.panier);

      const handleUpdateValue = async (choix:string) => {

        if(choix === 'plus' && element.quantite < 5){
          dispatch(increaseArticle(element._id))
        }else if(choix === 'minus' && element.quantite > 1){
          dispatch(decreaseArticle(element._id))
        }

      }

      const handleDeleteItem = async () => {
        dispatch(supprimerArticle(element._id))
      }


  return (
    <div className="flex items-center py-5 max-md:items-start">
    <div className="flex w-3/5"> 
      <img className="h-[120px] w-[120px] max-md:w-[90px] " src={element.img[0]} alt="canape" />
      <div className="flex flex-col ml-4 gap-1">
        <Link to="/" className="text-lg text-gray-900 font-semibold hover:underline max-sm:text-sm max-sm:w-[80%]">{element.nomProduit}</Link>
        <span className="text-md font-semibold max-sm:text-sm max-sm:w-2/5">€ {element.prix+".00"}</span>
          <p className="text-sm max-sm:text-xs">Taille: 140X190</p>
          <p className="text-sm max-sm:text-xs">Taille du Matelas: NON- SANS MATELAS</p>
          <div className='flex items-center md:hidden'>
          <div className='w-[142px] h-[50px] border border-black flex justify-between items-center max-md:w-[120px] max-md:h-[40px]'> <FiMinus onClick={() => handleUpdateValue('minus')} className="ml-3 cursor-pointer" size={10}/><span>{element.quantite}</span><FaPlus onClick={() => handleUpdateValue('plus')} size={10} className="mr-3 cursor-pointer"/> </div>
              <FaRegTrashAlt size={20} className='ml-4 cursor-pointer' onClick={handleDeleteItem}/>
          </div>
      </div>
    </div>
    <div className="flex justify-start w-1/5 max-md:hidden">
      {/* Quantity adjustment */}
      <div className="flex items-center py-3 gap-2">
              <div className='w-[142px] h-[50px] border border-black flex justify-between items-center'> <FiMinus onClick={() => handleUpdateValue('minus')} className="ml-3 cursor-pointer" size={10}/><span>{element.quantite}</span><FaPlus onClick={() => handleUpdateValue('plus')} size={10} className="mr-3 cursor-pointer" /> </div>
              <FaRegTrashAlt size={20} className='ml-4 cursor-pointer' onClick={handleDeleteItem}/>
      </div>
    </div>
    <span className="text-center w-1/5 font-bold text-sm text-end max-md:w-2/5 max-md:text-md">€{element.prix+'.00'}</span>
  </div>
  )
}
