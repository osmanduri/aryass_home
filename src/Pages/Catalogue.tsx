import { useState, useEffect } from "react"
import ListeProduits from "./Catalogues/ListeProduits"
import Menu from "./Catalogues/Menu"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux';
import MenuDetailsFilter from "./Catalogues/MenuDetailsFilter";
import { useParams } from "react-router-dom";
import AucunProduitTrouvé from "./Catalogues/AucunProduitTrouvé";
import { updateDetailsProduct } from "../redux/filterSlice";

export default function Catalogue() {
  //@ts-ignore
  const filter = useSelector((state) => state.filter);
  const [productTab, setProductTab] = useState([])
  const params = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    
    const payloadFilter = {
      dispo:filter.dispo,
      priceMin:filter.priceMin,
      priceMax:filter.priceMax,
      sortBy:filter.sortBy

    }
    
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      await axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/product/getAllProductByCategorie/${params.choix_categorie}`, payloadFilter)
      .then((res) => {
        setProductTab(res.data)
                        
      })
      .catch(err => console.log(err))

      await axios.get(`${import.meta.env.VITE_BASE_URL_PROD}/api/product/getProductDetails/${params.choix_categorie}`)
      .then((res:any) => {
        dispatch(updateDetailsProduct(res.data))
      })
      .catch(err => console.log(err))
    }

    fetchProduct();

  }, [filter,params])
  return (
    <div className="">
      <div className="h-[1px] w-full bg-black opacity-10"/>
      <div className="max-w-[1536px] mx-auto p-10">
        <Menu nbProduct={productTab.length}/>
        <MenuDetailsFilter/>
      <div className="flex flex-wrap justify-start mt-12 max-lp:justify-center">
        {
          productTab.map((element, index) => {
            return (
              <ListeProduits key={index} element={element} index={index}/>
            )
          })
        }
        {productTab.length === 0 && <AucunProduitTrouvé/>}
      </div>
      </div>
      
    </div>
  )
}



