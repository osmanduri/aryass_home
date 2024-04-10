import {useState} from 'react'

export default function ProductListSearchBar({element}:any) {
  const [enter, setEnter] = useState(false)
  return (
    <div className="h-[70px] p-2 bg-white flex items-center hover:bg-[#333333] cursor-pointer" onMouseEnter={() => setEnter(true)} onMouseLeave={() => setEnter(false)}>
      <img className="w-12 h-12 border border-black" src={element.img[0]} alt="product_img_0"/>
      <p className="ml-8 max-sm:text-xs" style={enter ? {color:"white"} : {color:"black"}}>{element.nomProduit}</p>
    </div>
  )
}
