
export default function SingleCommandeDetails({product}:any) {
  return (
    <div className='flex justify-between mt-4'>
    <div className='flex gap-3'>
        <img className="w-24 h-24 max-sm:w-18 max-sm:h-18" src={product.img[0]} alt="img_cmd"/>
        <div>
            <p className='font-bold max-sm:w-[150px] max-sm:text-sm'>{product.nomProduit}</p>
            {
            product.tags.length > 0 ? product.tags.map((e:any, index:number) => {
              return (
                <p key={index} className="text-sm max-sm:text-xs capitalize max-md:w-[155px]"><span className='font-semibold'>{e.type}:</span> {e.valeur}</p>
              )
            })
            :
            <p className='text-sm max-sm:text-xs capitalize'>Aucune option.</p>
            
          }
          <p className='text-sm font-semibold max-sm:text-xs'>Quantite: {product.quantite}</p>
        </div>
        
    </div>
    <p className='max-sm:text-sm text-md font-bold max-sm:w-[90px] text-right'>Prix: <span className='font-normal max-sm:text-sm'>{product.prix}.00 €</span></p>
    </div>
  )
}
