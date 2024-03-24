import { useState } from 'react'
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import Quantite from './Panier/Quantite';
import { useDispatch } from 'react-redux';
import { increaseArticle,decreaseArticle , supprimerArticle } from '../redux/panierSlice';
import { useSelector } from 'react-redux';
import axios from 'axios'
import { updateSuccess } from '../redux/userSlice';
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

export default function PanierComponent({element}:any) {
  //@ts-ignore
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
      //const panier = useSelector((state) => state.panier);

      const handleUpdateValue = async (choix:string) => {
        if(choix === "plus" && user.userInfo){
          await axios.post(`http://localhost:5005/api/users/panier/incrementer/${user.userInfo._id}`, {product_id:element.id})
          .then((res:any) => {
            console.log(res.data)
            dispatch(updateSuccess(res.data))
          })
          .catch(err => console.log(err))
        }else if(choix === 'minus'){
          await axios.post(`http://localhost:5005/api/users/panier/decrementer/${user.userInfo._id}`, {product_id:element.id})
          .then((res:any) => {
            console.log(res.data)
            dispatch(updateSuccess(res.data))
          })
          .catch(err => console.log(err))
        }
      }

      const handleDeleteItem = async () => {
        console.log(element.id)
        try{
          if(user.userInfo){
            await axios.post(`http://localhost:5005/api/users/panier/remove/${user.userInfo._id}`, {product_id:element.id})
            .then((res) => {
              dispatch(updateSuccess(res.data))
            })
            .catch(err => console.log(err))
          }else{
            // LocalStorage
          }

        }catch(err){
          console.log(err)
        }
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
