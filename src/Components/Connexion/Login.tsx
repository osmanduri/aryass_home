import { useState } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import {Dispatch, SetStateAction} from 'react'
import axios from "axios";
import Cookies from 'universal-cookie'
import { updateSuccess } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
interface RegisterProps {
    isLogin:boolean;
    setIsLogin: Dispatch<SetStateAction<boolean>>;
}

export default function Login({isLogin, setIsLogin}:RegisterProps) {
    const dispatch = useDispatch()
    const [inputEmail, setInputEmail] = useState<string>('')
    const [inputPassword, setInputPassword] = useState<string>('')
    const [errorMsg, setErrorMsg] = useState<string>("")

    const handleSubmit = (e:any) => {
        setErrorMsg('')
        e.preventDefault()
        const cookies = new Cookies();

        const loginUser = () => {
            const payload = {
                email:inputEmail,
                password:inputPassword
            }

            axios.post(`${import.meta.env.VITE_BASE_URL_PROD}/api/users/login`, payload)
            .then((res) => {
                if(res.data){
                    cookies.set('token', res.data.token, { path: '/' });
                    dispatch(updateSuccess(res.data))
                    window.location.href = "/profil"
                }
            })
            .catch(err => {
                setErrorMsg(err.response.data.message)
                console.log(err.response.data.message)
                
            })
        }

        loginUser();
    }
  return (
    <div className='bg-[#F3F3F3] p-6'>
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-2xl shadow-slate-300 ">
        <h1 className="text-4xl font-medium">Login</h1>

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
                <div className="flex flex-row justify-start">
                    <div>
                        <a href="#" className="font-medium text-indigo-600 text-black">Mot de passe oublié ?</a>
                    </div>
                </div>
                <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                      
                      <span className='text-white'>Connexion</span>
                      <FaArrowRightToBracket color="red"/>
                </button>
                <p className="text-[red] text-center uppercase">{errorMsg}</p>
                <div className='flex flex-col items-center gap-4'>
                <p className="text-center">Vous n'êtes pas encore inscrit?</p>
                <div onClick={() => setIsLogin(!isLogin)} className="cursor-pointer text-indigo-600 font-medium inline-flex space-x-1 items-center"><span className='hover:underline'> Inscription </span></div>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}
