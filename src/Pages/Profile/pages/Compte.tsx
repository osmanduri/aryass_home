import { useState, useEffect, useRef } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useSelector } from "react-redux";
import axios from "axios";
import UserUpdateModal from "./comptesModal/UserUpdateModal";
import { motion } from 'framer-motion';
import useOutsideClick from "../../Catalogues/ClickOutside/useOutsideClick";
import EmailUpdateModal from "./comptesModal/EmailUpdateModal";
import PasswordUpdateModal from "./comptesModal/PasswordUpdateModal";

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

export default function Compte() {
    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)
    const [showUpdateUserModal, setShowUpdateUserModal] = useState<boolean>(false);
    const [showUpdateEmailModal, setShowUpdateEmailModal] = useState<boolean>(false)
    const [showUpdatePasswordModal, setShowUpdatePasswordModal] = useState<boolean>(false)

    const modalRefUser = useRef<HTMLDivElement | null>(null);
    const modalRefEmailUpdate = useRef<HTMLDivElement | null>(null);
    const modalRefPassword = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            await axios.get(`http://localhost:5005/api/users/getUserById/${user._id}`)
            .then((res:any) => {
                console.log(res.data)
            })
            .catch(err => console.log(err))
        }

        fetchUser();
        
    }, [user])

    useOutsideClick(modalRefUser, () => setShowUpdateUserModal(false))
    useOutsideClick(modalRefEmailUpdate, () => setShowUpdateEmailModal(false))
    useOutsideClick(modalRefPassword, () => setShowUpdatePasswordModal(false))
  return (
    <>
    <div className='max-w-[900px] mx-auto max-sm:px-4'>
        <h1 className='text-2xl uppercase text-center underline mt-12 max-sm:text-lg'>Gérer mon compte</h1>

        <div className='mt-4'>
        <h2 className='text-2xl font-bold'>Vos Données:</h2>
            <div className='flex justify-between mt-8'>
            <div className="flex gap-6">
                <FaRegUser size={30}/>
                <div className='flex flex-col gap-2 font-bold'>
                    <p>{user.civilite ? user.civilite : "Civilite"}</p>
                    <p><span>{user.prenom ? user.prenom : "Prenom" }</span> <span>{user.nom ? user.nom : "Nom"}</span></p>
                    <p>{user.telephone ? user.telephone : "Telephone"}</p>
                    <p>{user.adresse ? user.adresse : "Adresse"}</p>
                    <p>{user.ville ? user.ville : "Ville"}</p>
                    <p>{user.codePostal ? user.codePostal : "Code Postal"}</p>
                </div>
            </div>

            <p className="flex items-center underline cursor-pointer font-semibold" onClick={() => setShowUpdateUserModal(true)}>Modifier</p>
            </div>
            
        </div>
        <div className="h-[1px] w-full bg-black opacity-10 mt-4 mb-4"/>
        <div className='mt-4'>
        <h2 className='text-2xl font-bold'>Votre adresse email:</h2>
            <div className='flex justify-between mt-8'>
            <div className="flex items-center gap-6">
                <MdOutlineMail size={30}/>
                <div className='flex flex-col gap-2 font-bold'>
                    <p>{user.email}</p>
                </div>
            </div>

            <p className="flex items-center underline cursor-pointer font-semibold" onClick={() => setShowUpdateEmailModal(true)}>Modifier</p>
            </div>
            
        </div>
        <div className="h-[1px] w-full bg-black opacity-10 mt-4 mb-4"/>
        <div className='mt-4'>
        <h2 className='text-2xl font-bold'>Votre mot de passe:</h2>
            <div className='flex justify-between mt-8'>
            <div className="flex items-center gap-6">
                <CiLock size={30}/>
                <div className='flex flex-col gap-2 font-bold'>
                    <p>••••••••••</p>
                </div>
            </div>

            <p className="flex items-center underline cursor-pointer font-semibold" onClick={() => setShowUpdatePasswordModal(true)}>Modifier</p>
            </div>
            
        </div>
    </div>

        {showUpdateUserModal && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={backdrop}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.5)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalRefUser}>
            <UserUpdateModal setShowUpdateUserModal={setShowUpdateUserModal}/>
          </div>
        </motion.div>
      )}

        {showUpdateEmailModal && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={backdrop}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.5)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalRefEmailUpdate}>
            <EmailUpdateModal/>
          </div>
        </motion.div>
      )}

        {showUpdatePasswordModal && (
        <motion.div
        initial="hidden"
        animate="visible"
        variants={backdrop}
        className="fixed inset-0 z-50 flex justify-center items-center"
        style={{ backdropFilter: 'blur(3px)', backgroundColor: 'rgba(0,0,0,0.5)' }} // Optionnel: flou de l'arrière-plan
      >
          <div ref={modalRefPassword}>
            <PasswordUpdateModal/>
          </div>
        </motion.div>
      )}
    </>
  )
}
