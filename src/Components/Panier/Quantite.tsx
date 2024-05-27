import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateSuccess } from "../../redux/userSlice";





export default function Quantite({element}:any) {
  //@ts-ignore
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const handleUpdateValue = async (choix:string) => {
    if(choix === "plus" && user.userInfo){
      await axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/users/panier/incrementer/${user.userInfo._id}`, {product_id:element.id})
      .then((res:any) => {
        dispatch(updateSuccess(res.data))
      })
      .catch(err => console.log(err))
    }else if(choix === 'minus'){
      await axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/users/panier/decrementer/${user.userInfo._id}`, {product_id:element.id})
      .then((res:any) => {
        dispatch(updateSuccess(res.data))
      })
      .catch(err => console.log(err))
    }
  }

  return (
    <div className="flex items-center justify-center border border-black px-3 py-3 gap-x-4">
        <FiMinus size={10} className="cursor-pointer" onClick={() => handleUpdateValue('minus')}/>
        <span className="border-none mx-2 border text-center w-12">{element.quantite}</span>
        <FaPlus size={10} className="cursor-pointer" onClick={() => handleUpdateValue('plus')}/>
    </div>
  )
}
