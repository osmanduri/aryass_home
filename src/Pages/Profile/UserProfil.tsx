import { useSelector } from "react-redux"
import Cookies from "universal-cookie";
export default function Bienvenue() {
  //@ts-ignore
  const user = useSelector(state => state.user)
  console.log(user)

  function handleDisconnect(){
    const cookies = new Cookies();
    // Supprimer le cookie "token"
    cookies.remove('token');

    // Naviguer vers la page "/login"
    setTimeout(() => {
      window.location.href = '/'
    }, 500)
    
  }
  return (
    <div className="text-center text-4xl">Bienvenue {user.userInfo.prenom} {user.userInfo.nom}
    
    <p className="cursor-pointer hover:underline" onClick={handleDisconnect}>Effectuer une deconnexion</p>
    </div>
  )
}