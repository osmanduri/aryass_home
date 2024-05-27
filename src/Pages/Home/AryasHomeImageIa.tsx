import aryas_home_ia from '/home/aryas_home_resized_1600x800.png'
import { Link } from 'react-router-dom'

export default function AryasHomeImageIa() {
  return (
    <div className='mt-12'>

        <div className='relative w-full h-[600px] flex justify-center max-md:h-[300px]'>
            <img className='w-full h-full' src={aryas_home_ia} alt="aryas_home"/>
            <Link to="catalogue/canape" className='bg-black text-white font-bold absolute top-[500px] max-md:top-[230px] px-6 py-3 max-md:px-4 max-md:py-2 max-md:text-sm border border-[grey] border-3 rounded-full cursor-pointer hover:border-white hover:bg-white hover:text-black hover:border-black'>Découvrez nos canapés</Link>
        </div>
        
    </div>
  )
}
