
import axios from 'axios'
import { useState } from 'react';
import {  useSelector } from 'react-redux'
import Cookies from "universal-cookie"
export default function PasswordUpdateModal() {
    const cookies = new Cookies()
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPasswordAgain, setNewPasswordAgain] = useState<string>('')
    const [msgApi, setMsgApi] = useState({
        msg:"",
        color:""
    })
    const [loading, setLoading] = useState<boolean>(false)
    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)

    const handleSubmit = (e:any) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            oldPassword:oldPassword,
            newPassword:newPassword
        }

        const updatePassword = async () => {
            await axios.put(`http://localhost:5005/api/users/updatePassword/${user._id}`, payload ,{
                headers:{
                    'token': `Bearer ${cookies.get('token')}`
                }
            })
            .then((res:any) => {
                console.log(res.data.user)
                setMsgApi({
                    msg:res.data.message,
                    color:"green"
                })
                setLoading(false)
            })
            .catch((err:any) => {
                console.log(err)
                setMsgApi({
                    msg:err.response.data.message,
                    color:"red"
                })
                setLoading(false)
            })
        }
        setTimeout(() => {
            if(newPassword !== newPasswordAgain){
                setMsgApi({
                    msg:"Les mots de passe ne correspondent pas",
                    color:"red"
                })
                setLoading(false)
            }else{
                updatePassword();
                setLoading(false)
            }

        }, 1000)
        
    } 
    return (
        <form onSubmit={handleSubmit} className="w-[700px] max-sm:w-[320px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <div className="mb-4">
                <h1 className="text-xl font-bold mb-2">Modification de votre mot de passe</h1>
                <p className="text-gray-700 text-base mb-4">
                    Veuillez renseigner un nouveau mot de passe.
                </p>
        
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Votre ancien mot de passe ici
                    </label>
                    <input onChange={(e) => setOldPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Ancien Mot de passe" required/>
                </div>
        
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Votre nouveau mot de passe
                    </label>
                    <input onChange={(e) => setNewPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Nouveau Mot de passe" required/>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                    Répétez votre nouveau mot de passe
                    </label>
                    <input onChange={(e) => setNewPasswordAgain(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Répétez votre mot de passe" required/>
                </div>
                { loading ? <div className='flex justify-center'> <img className="w-12" src="/loading/loading.gif" alt="loading"/> </div> : <p style={{color:msgApi.color}} className='text-center'>{msgApi.msg}</p> }
                <div className="flex items-center justify-between">
                    <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Enregistrer les données
                    </button>
                </div>
            </div>
        </form>
          )
}
