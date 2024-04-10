import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { increaseArticle, decreaseArticle, supprimerArticle } from '../redux/panierSlice';

export default function PanierComponent({element}:any) {
  const dispatch = useDispatch()

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
    <div className="flex w-3/5 max-md:w-4/5"> 
      <Link to={`/catalogue/${element.categorie}/${element._id}`} className='cursor-pointer w-[120px] h-[120px] max-md:w-[90px] max-md:h-[90px]'>
        <img className="w-full h-full object-fill" src={element.img[0]} alt="canape" />
      </Link>
      <div className="flex flex-col ml-4 gap-1 max-md:w-[160px]">
        <Link to={`/catalogue/${element.categorie}/${element._id}`} className="text-lg text-gray-900 font-semibold hover:underline max-sm:text-sm max-lg:w-[290px] max-md:w-[200px] max-sm:w-[150px]">{element.nomProduit}</Link>
        <span className="text-lg font-semibold max-sm:text-sm max-sm:w-2/5">€ {element.prix+".00"}</span>
          {
            
            element.tags.length > 0 ? element.tags.map((e:any, index:number) => {
              return (
                <p key={index} className="text-sm max-sm:text-xs capitalize max-md:w-[160px]">{e.type}: {e.valeur}</p>
              )
            })
            :
            <p className='text-sm max-sm:text-xs capitalize'>Aucune option.</p>
          }
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
    <span className="text-center w-1/5 font-bold text-lg text-end max-md:w-2/5 max-md:text-sm max-sm:font-bold">€{element.prix*element.quantite + '.00'}</span>
  </div>
  )
}
