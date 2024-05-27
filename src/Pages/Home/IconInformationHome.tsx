import { CiDeliveryTruck } from "react-icons/ci";

interface IconInformationHomeProps {
    element:{
        icon:string;
        titre:string;
        texte:string;
    }

}

export default function IconInformationHome({element}:IconInformationHomeProps) {
    let iconStyles = { color: "black", fontSize: "2.5em" };
  return (
    <div className="flex flex-col justify-center items-center w-full h-[200px]">
      <div className="bg-[black] rounded-full p-4 myClass">
        <CiDeliveryTruck size={30} style={iconStyles}/>
        
      </div>
      <h1 className="font-bold mt-3 w-full text-center h-[50px]">{element.titre}</h1>
      <p className="font-light w-[70%] text-center h-[100px]">{element.texte}</p>
    </div>
  );
}
