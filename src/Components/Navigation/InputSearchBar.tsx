import {useState, useEffect} from 'react'
import { IoIosSearch } from "react-icons/io";
import ProductListSearchBar from "./ProductListSearchBar";
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function InputSearchBar({productTab, setProductTab}:any) {
  const p = ['1','2','3','4', 'll', 'a','a','a','a','a','a','a','a','a']
  const [nomProduitInput, setNomProduitInput] = useState<string>('')
  
  const [overflowList, setOverflowList] = useState<boolean>(false)
  const [aucunProduit, setAucunProduit] = useState<string>('')

  const apiCall = async () => {

    const payload = {
      recherche:nomProduitInput
    }
    await axios.post(`http://localhost:5005/api/product/getAllProduct/recherche`, payload)
    .then((res:any) => {
      setProductTab(res.data)
      if(res.data.length > 4){
        setOverflowList(true)
      }else{
        setOverflowList(false)
      }

    })
    .catch((err:any) => {
      console.log(err.response.data)
      setAucunProduit(err.response.data)
    })
  }

  useEffect(() => {
    setProductTab([])
    setAucunProduit('')
      if(nomProduitInput.length > 0){
        const timeoutId = setTimeout(apiCall, 1200); // la fonction apiCall s'execute 1.2 seconde apres avoir taper une adresse dans le input
        return () => clearTimeout(timeoutId);
      }else{
        setProductTab([])
      }

  
  }, [nomProduitInput])
  
  return (
    <div className="w-[740px] h-[40] mt-[35px] relative">
      <div className="relative w-full min-w-[200px] h-10">
        <IoIosSearch size={20} className="absolute right-4 top-[10px]"/>
        <input className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] !pr-9 border-blue-gray-200 focus:border-gray-900" placeholder=" " onChange={(e) => setNomProduitInput(e.target.value)}/>
        <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">Recherche</label>
      </div>
      {productTab.length > 0 && <div className="border border-t-0 border-black absolute w-full bg-white" style={overflowList ? {overflow:"scroll", height:"300px"} : {overflow:"visible", height:"auto"}}>
        {
          productTab?.map((element:any, index:number) => {

            return (
              <a href={`/catalogue/${element.categorie}/${element._id}`} key={index}><ProductListSearchBar element={element} key={index}/></a>
            )
          })
        }
      
      </div>
    
    
    }

    { productTab.length === 0 && nomProduitInput && aucunProduit === 'Aucun produit trouvé' && <p className='absolute w-full flex items-center justify-center border border-t-0 border-black h-[70px] p-2 bg-white'>Aucun produit trouvé</p> }
      
    </div> 
  )
}
