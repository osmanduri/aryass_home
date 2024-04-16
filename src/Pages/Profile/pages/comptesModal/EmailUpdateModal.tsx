import axios from 'axios'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateSuccess } from '../../../../redux/userSlice';
import Cookies from "universal-cookie"

export default function EmailUpdateModal() {
    const cookies = new Cookies()
    const [newEmail, setNewEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [msgApi, setMsgApi] = useState({
        msg:"",
        color:""
    })
    const [loading, setLoading] = useState<boolean>(false)
    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch();

    const handleSubmit = (e:any) => {
        e.preventDefault()
        setLoading(true)

        const payload = {
            email:newEmail,
            password:password
        }

        const updateEmail = async () => {
            await axios.put(`http://localhost:5005/api/users/updateEmail/${user._id}`, payload ,{
                headers:{
                    'token': `Bearer ${cookies.get('token')}`
                }
            })
            .then((res:any) => {
                console.log(res.data.user)
                dispatch(updateSuccess(res.data.user))
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
            updateEmail();
            setLoading(false)
        }, 1000)
        
    } 
  return (
<form onSubmit={handleSubmit} className="w-[700px] max-sm:w-[320px] bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Changer d'adresse email</h1>
        <p className="text-gray-700 text-base mb-4">
            Veuillez renseigner une nouvelle adresse e-mail et confirmer la modification en saisissant votre mot de passe.
        </p>

        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Votre nouvelle adresse e-mail
            </label>
            <input onChange={(e) => setNewEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="Email" required />
        </div>

        <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                Votre mot de passe actuel
            </label>
            <input onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="*************" required/>
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
