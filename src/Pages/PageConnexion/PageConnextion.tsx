import {useState} from "react"
import Login from "../../Components/Connexion/Login"
import Register from "../../Components/Connexion/Register"

export default function PageConnextion() {
    const [isLogin, setIsLogin] = useState<boolean>(true)
  return (
    <>
    {isLogin ? <Login isLogin={isLogin} setIsLogin={setIsLogin}/> : <Register isLogin={isLogin} setIsLogin={setIsLogin}/>}
    </>
  )
}
