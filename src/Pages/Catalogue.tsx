import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import ListeProduits from "./Catalogues/ListeProduits"
import Menu from "./Catalogues/Menu"
//import { canape } from "../../data/catalogues"
import axios from 'axios'
import { useSelector } from 'react-redux';
import MenuDetailsFilter from "./Catalogues/MenuDetailsFilter";

export default function Catalogue() {
  //@ts-ignore
  const filter = useSelector((state) => state.filter);
  const [productTab, setProductTab] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      await axios.get('http://localhost:5005/api/product/getAllProduct')
      .then((res) => {
        setProductTab(res.data)
      })
      .catch(err => console.log(err))
    }

    fetchProduct();

  }, [filter])
  return (
    <div className="">
      <div className="h-[1px] w-full bg-black opacity-10"/>
      <div className="max-w-[1536px] mx-auto p-10">
        <Menu/>
        <MenuDetailsFilter/>
      <div className="flex flex-wrap justify-between mt-12 max-lp:justify-center">
        {
          productTab.map((element, index) => {
            return (
              <ListeProduits element={element} key={index}/>
            )
          })
        }
      </div>
      </div>
      
    </div>
  )
}
