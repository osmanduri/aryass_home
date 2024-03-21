import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";

interface QuantiteProps {
    value:number;
    handleUpdateValue: (choix:string) => void;
}

export default function Quantite({value, handleUpdateValue}:QuantiteProps) {

  return (
    <div className="flex items-center justify-center border border-black px-3 py-3 gap-x-4">
        <FiMinus size={10} className="cursor-pointer" onClick={() => handleUpdateValue('minus')}/>
        <span className="border-none mx-2 border text-center w-12">{value}</span>
        <FaPlus size={10} className="cursor-pointer" onClick={() => handleUpdateValue('plus')}/>
    </div>
  )
}
