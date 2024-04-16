import { useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import Cookies from "universal-cookie";
import { disconnectUser } from "../../redux/userSlice";
import MenuElement from "./components/MenuElement";
import { menu } from '../../data/menu_profile'
import ProfilHome from "./pages/ProfilHome";
import Commandes from "./pages/Commandes";
import Compte from "./pages/Compte";

interface MenuItems {
  titre:string;
  icon:string;
  url:string;

}

export default function Bienvenue() {
  const [choiceMenu, setChoiceMenu] = useState<string>('Bienvenue')
  //@ts-ignore
  const user = useSelector(state => state.user.userInfo)
  const dispatch = useDispatch()

  function handleDisconnect(){
    const cookies = new Cookies();
    // Supprimer le cookie "token"
    cookies.remove('token');
    dispatch(disconnectUser())

    // Naviguer vers la page "/login"
    //setTimeout(() => {
      window.location.href = '/'
    //}, 100)
    
  }

  const handleMenu = (choix:MenuItems) => {
    
    switch(choix.titre){
      case 'Bienvenue':{
        setChoiceMenu('Bienvenue')
        break;
      }
      case 'Commandes':{
        setChoiceMenu('Commandes')
        break;
      }
      case 'Compte':{
        setChoiceMenu('Compte')
        break;
      }
      case 'Deconnexion':{
        handleDisconnect();
        break;
      }
    }
  }
  return (
    <>
    <div className="text-center text-4xl">Bonjour {user.prenom} !</div>
    
    
    <div className="flex items-center justify-center gap-12 mt-16 max-sm:gap-4">
    {
      menu.map((element, index) => {
        return (
          <div key={index} onClick={() => handleMenu(element)}><MenuElement key={index} element={element}  choiceMenu={choiceMenu}/></div>
        )
      })
    }
    </div>
    <div className="h-[1px] w-full bg-black opacity-10"/>
    <div className="max-w-7xl mx-auto">
      { choiceMenu === 'Bienvenue' && <ProfilHome/> }                     
      { choiceMenu === 'Commandes' && <Commandes/> }
      { choiceMenu === 'Compte' && <Compte/> }
    </div>

    

</>
  )
}
