import {useState} from 'react'
import { FaArrowRightToBracket } from "react-icons/fa6";
import {Dispatch, SetStateAction} from 'react'
import axios from 'axios'
interface RegisterProps {
    isLogin:boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

interface ErrorMessage {
    msg: string;
    color: string;
  }

export default function Register({isLogin, setIsLogin}:RegisterProps) {
    const [inputEmail, setInputEmail] = useState<string>('')
    const [inputPassword, setInputPassword] = useState<string>('')
    const [inputRepetezPassword, setInputRepetezPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<ErrorMessage>({
        msg:"",
        color:""
    })
    const handleSubmit = (e:any) => {
        e.preventDefault()
        setErrorMsg({msg:"",color:""})
        const registerUser = () => {
            const payload = {
                email:inputEmail,
                password:inputPassword
            }

            axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/users/addUser`, payload)
            .then((res) => {
                console.log(res.data.user)
                setErrorMsg({
                    msg:res.data.message,
                    color:"green"
                })

            })
            .catch(err => {
                console.log(err)
                setErrorMsg({
                    msg:err.response.data,
                    color:"red"
                })
            })
        }
        if(inputPassword !== inputRepetezPassword){
            setErrorMsg({
                msg:"Les mots de passe ne correspondent pas",
                color:"red"
            })
        }else{
            registerUser();
        }
        
    }
    return (
    <div className='bg-[#F3F3F3] p-20'>
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-2xl shadow-slate-300 ">
        <h1 className="text-4xl font-medium">Inscription</h1>

        <form onSubmit={handleSubmit} className="my-10">
            <div className="flex flex-col space-y-5">
                <label >
                    <p className="font-medium text-slate-700 pb-2">Adresse email</p>
                    <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Entrez votre adresse email" required onChange={(e) => setInputEmail(e.target.value)}/>
                </label>
                <label >
                    <p className="font-medium text-slate-700 pb-2">Mot de passe</p>
                    <input id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Entrez votre mot de passe" required onChange={(e) => setInputPassword(e.target.value)}/>
                </label>
                <label >
                    <p className="font-medium text-slate-700 pb-2">Répétez votre Mot de passe</p>
                    <input id="password" name="password" type="password" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Entrez votre mot de passe" required onChange={(e) => setInputRepetezPassword(e.target.value)}/>
                </label>
                <p className='text-center' style={{color:errorMsg.color}}>{errorMsg.msg}</p>
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                      <span className='text-white'>Créer un compte</span>
                      <FaArrowRightToBracket color="red"/>
                </button>
                <div className='flex flex-col items-center gap-4'>
                <p className="text-center">Vous êtes déjà inscrit?</p>
                <div onClick={() => setIsLogin(!isLogin)} className="cursor-pointer  text-indigo-600 font-medium inline-flex space-x-1 items-center"><span className='hover:underline'> Connectez-vous </span></div>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}
