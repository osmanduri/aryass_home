import { useState, useEffect } from "react"
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux"
import { updateSuccess } from "../../../../redux/userSlice"
import Cookies from "universal-cookie"

interface Payload {
    nom?: string;
    prenom?: string;
    adresse?: string;
    ville?: string;
    codePostal?: string;
    civilite?: string;
    telephone?: string;
}

export default function UserUpdateModal({setShowUpdateUserModal}:any) {
    const cookies = new Cookies()
    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const [nom, setNom] = useState<string>('')
    const [prenom, setPrenom] = useState<string>('')
    const [adresse, setAdresse] = useState<string>('')
    const [ville, setVille] = useState<string>('')
    const [codePostal, setCodePostal] = useState<string>('')
    const [civilite, setCivilite] = useState<string>('')
    const [telephone, setTelephone] = useState<string>('')
    const [msgApi, setMsgApi] = useState({
        msg:"",
        color:""
    })

    useEffect(() => {
        const nom = document.getElementById('nom') as HTMLInputElement;
        if (nom) {
            nom.value = user.nom || '';
        }
    
        const prenom = document.getElementById('prenom') as HTMLInputElement;
        if (prenom) {
            prenom.value = user.prenom || '';
        }
    
        const adresse = document.getElementById('adresse') as HTMLInputElement;
        if (adresse) {
            adresse.value = user.adresse || '';
        }
    
        const ville = document.getElementById('ville') as HTMLInputElement;
        if (ville) {
            ville.value = user.ville || '';
        }
    
        const codePostal = document.getElementById('codePostal') as HTMLInputElement;
        if (codePostal) {
            codePostal.value = user.codePostal || '';
        }
    
        const civilite = document.getElementById('civilite') as HTMLSelectElement
        if (civilite) {
            civilite.value = user.civilite || '';
        }
    
        const telephone = document.getElementById('telephone') as HTMLInputElement;
        if (telephone) {
            telephone.value = user.telephone || '';
        }
    }, [user]) // Ajout de `user` dans le tableau des dépendances pour réagir aux changements de cet objet


    

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setMsgApi({
            msg:"",
            color:""
        })
    
        // Créer un objet avec les champs remplis
        const payload:Payload = {};
        if (nom) payload.nom = nom;
        if (prenom) payload.prenom = prenom;
        if (adresse) payload.adresse = adresse;
        if (ville) payload.ville = ville;
        if (codePostal) payload.codePostal = codePostal;
        if (civilite) payload.civilite = civilite;
        if (telephone) payload.telephone = telephone;
    
        const updateUser = () => {
            axios.put(`http://localhost:5005/api/users/updateUserById/${user._id}`, payload, {
                headers:{
                    'token': `Bearer ${cookies.get('token')}`
                }
            })
            .then((res: any) => {
                console.log(res.data);
                dispatch(updateSuccess(res.data.user));
                setMsgApi({
                    msg:"Utilisateur mis à jour",
                    color:"green"
                })
            })
            .catch((err: any) => {
                console.log(err);
                setMsgApi({
                    msg:"Erreur mise à jour",
                    color:"red"
                })
            });
        };
    
        if (Object.keys(payload).length > 0) {
            setTimeout(() => {
                updateUser();
            }, 500)
            
        } else {
            console.log("Aucune donnée à mettre à jour.");
        }
    }
  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl">
  <div className="max-w-2xl mx-auto py-8 px-4 ">
      <h2 className=" mb-4 text-xl font-bold text-gray-900 dark:">Mise à jour des informations</h2>
      <form onSubmit={handleSubmit}>
          <div className="grid gap-0 mb-0 sm:grid-cols-2 sm:gap-8 sm:mb-5">
              <div className="w-full">
                  <label  className="  block mb-2 text-sm font-medium text-gray-900 dark:">Nom</label>
                  <input id="nom" onChange={(e) => setNom(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom" />
              </div>
              <div className="w-full">
                  <label  className=" block mb-2 text-sm font-medium text-gray-900 dark:">Prénom</label>
                  <input id="prenom" onChange={(e) => setPrenom(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Prenom" />
              </div>
              <div className="sm:col-span-2">
                  <label  className=" block mb-2 text-sm font-medium text-gray-900 dark:">Adresse</label>
                  <input id="adresse" onChange={(e) => setAdresse(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Adresse" />
              </div>
              <div className="w-full">
                  <label  className="  block mb-2 text-sm font-medium text-gray-900 dark:">Ville</label>
                  <input id="ville" onChange={(e) => setVille(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ville" />
              </div>
              <div className="w-full">
                  <label  className="  block mb-2 text-sm font-medium text-gray-900 dark:">Code Postal</label>
                  <input id="codePostal" onChange={(e) => setCodePostal(e.target.value)} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Code Postal" />
              </div>

              <div>
                  <label  className=" block mb-2 text-sm font-medium text-gray-900 dark:">Civilité</label>
                  <select id="civilite" onChange={(e) => setCivilite(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500">
                      <option value="Homme" selected={true}>Homme</option>
                      <option value="Femme">Femme</option>
                  </select>
              </div>
              <div>
                  <label  className=" block mb-2 text-sm font-medium text-gray-900 dark:">Téléphone</label>
                  <input id="telephone" onChange={(e) => setTelephone(e.target.value)} type="number"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark: dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Telephone" />
              </div> 

          </div>
          <p className="text-center" style={{color:msgApi.color}}>{msgApi.msg}</p>
          <div className="flex justify-between items-center max-sm:mt-4 max-sm:gap-8 mt-2">
                <div onClick={() => setShowUpdateUserModal(false)} className="max-sm:w-1/2 max-sm:h-8 flex justify-center items-center w-32 h-8 bg-[black] text-white rounded cursor-pointer">
                    <p className="max-sm:text-sm text-white">Annuler</p>
                </div>
                <button  type="submit" className="max-sm:w-1/2 max-sm:h-8 w-32 h-8 bg-[black] text-white rounded">
                    <p className="max-sm:text-sm text-white">Mettre à jour</p>
                </button>
          </div>
      </form>
  </div>
</section>
  )
}
