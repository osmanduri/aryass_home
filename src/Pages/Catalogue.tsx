import { useEffect } from "react"
import ListeProduits from "./Catalogues/ListeProduits"
import Menu from "./Catalogues/Menu"
//import { canape } from "../../data/catalogues"
//import axios from 'axios'
import { useSelector } from 'react-redux';
import MenuDetailsFilter from "./Catalogues/MenuDetailsFilter";

export default function Catalogue() {
  //@ts-ignore
  const filter = useSelector((state) => state.filter);

  useEffect(() => {
    console.log(filter)
  }, [filter])
  return (
    <div className="">
      <div className="h-[1px] w-full bg-black opacity-10"/>
      <div className="max-w-[1536px] mx-auto p-10">
        <Menu/>
        <MenuDetailsFilter/>
      <div className="flex flex-wrap justify-between mt-12 max-lp:justify-center">
        <ListeProduits/>
        <ListeProduits/>
        <ListeProduits/>
        <ListeProduits/>
        <ListeProduits/>
        <ListeProduits/>
        <ListeProduits/>
        <ListeProduits/>
      </div>
      </div>
      
    </div>
  )
}
