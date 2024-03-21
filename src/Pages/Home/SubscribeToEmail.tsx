import { Input } from "@material-tailwind/react";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function SubscribeToEmail() {
    return (
        <>
        <div className="h-[1px] w-full bg-black opacity-10 mt-32"/>
        <div className="max-w-[1536px] mx-auto flex justify-center">
        
        <div className="w-72 mt-12 relative">
            <h1 className="text-center font-semibold text-lg">Soyez à jour des nouveautés</h1>
            <div className="mt-2">
                <Input label="Email" className="relative " crossOrigin="" />
                <FaLongArrowAltRight className="absolute top-12 right-4 cursor-pointer"/>
            </div>
        </div>
        </div>
        <div className="h-[1px] w-full bg-black opacity-10 mt-16"/>
        </>

      );
}
