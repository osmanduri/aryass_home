import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import ListeProduits from "./Catalogues/ListeProduits"
import Menu from "./Catalogues/Menu"
//import { canape } from "../../data/catalogues"
import axios from 'axios'
import { useSelector } from 'react-redux';
import MenuDetailsFilter from "./Catalogues/MenuDetailsFilter";
import { useParams } from "react-router-dom";

export default function Catalogue() {
  //@ts-ignore
  const filter = useSelector((state) => state.filter);
  const [productTab, setProductTab] = useState([])
  const params = useParams()

  useEffect(() => {
    console.log(filter)

    const payloadFilter = {
      dispo:filter.dispo,
      priceMin:filter.priceMin,
      priceMax:filter.priceMax,
      sortBy:filter.sortBy

    }
    
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      await axios.post(`http://localhost:5005/api/product/getAllProductByCategorie/${params.choix_categorie}`, payloadFilter)
      .then((res) => {
        setProductTab(res.data)
                
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

const calculePrixMaxEtStock = (data:any) => {
  

  //Calcule du prix Max
  const prixMax = data.reduce((max:number, produit:any) => produit.prix > max ? produit.prix : max, data[0].prix);
  data.prixMax = prixMax


  // Calcul du nombre de stock
  data.stock = 0;
  data.ruptureStock = 0;
  data.forEach((element:any) => {
    if(!element.dispo){
      data.ruptureStock++;
    }
    if(element.dispo){
      data.stock++;
    }
  });

  return data

}


