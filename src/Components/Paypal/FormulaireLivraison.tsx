import { useState, useEffect } from "react";
import PaypalButton from "./PaypalButton";
import { RxCross1 } from "react-icons/rx";
import paypal_logo from '/paypal/paypal.png'
import paypal_logo_2 from '/paypal/paypal_logo_2.png'

interface FormState {
    nom: string;
    prenom: string;
    email: string;
    adresse: string;
    ville: string;
    codePostal: string;
    telephone:string;
}

interface FormulaireLivraisonProps {
    totalPrice:number;
    setShowFormulaireLivraisonPaypal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FormulaireLivraison({totalPrice, setShowFormulaireLivraisonPaypal}:FormulaireLivraisonProps) {
    const [formState, setFormState] = useState<FormState>({
        nom: '',
        prenom: '',
        email: '',
        adresse: '',
        ville: '',
        codePostal: '',
        telephone: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false)

    useEffect(() => {
        // Check if all form fields are filled
        const testEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formState.email);
        const isAllFilled = Object.values(formState).every(value => value.trim() !== '');
        setIsFormValid(isAllFilled);
        setIsEmailValid(testEmail);
        console.log(testEmail)
    }, [formState]);  // Update validity whenever formState changes

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="relative w-[700px] max-sm:w-[90%] max-sm:mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col max-sm:pt-2 max-sm:pb-2">
            <div onClick={() => setShowFormulaireLivraisonPaypal(false)} className="absolute right-4 top-4 cursor-pointer">
                <RxCross1 size={20} />
            </div>
            <div className="mb-4">
                <div className="flex items-center justify-center"><h1 className="text-xl font-bold mb-2 max-sm:text-lg max-sm:hidden">Information de livraison pour le paiement en</h1><img className="w-32" src={paypal_logo} alt="paypal_logo"/></div>
                <p className="text-gray-700 text-base mb-4 max-sm:text-sm text-center">
                    Veuillez renseigner vos informations de livraison.
                </p>
                <div className="flex gap-12 max-sm:gap-2">
                    <div className="mb-0 w-1/2">
                        <label htmlFor="nom" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                            Nom
                        </label>
                        <input id="nom" type="text" name="nom" placeholder="Nom" value={formState.nom} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                    </div>
                    <div className="mb-0 w-1/2">
                        <label htmlFor="prenom" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                            Prenom
                        </label>
                        <input id="prenom" type="text" name="prenom" placeholder="Prenom" value={formState.prenom} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                    </div>
                </div>
                <div className="flex gap-12 mt-2 max-sm:gap-2">
                    <div className="mb-0 w-1/2">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                            Email
                        </label>
                        <input id="email" type="text" name="email" placeholder="Email" value={formState.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                        { !isEmailValid && formState.email && <p className="text-xs text-[red]">Format email incorrect</p> }
                    </div>
                    <div className="mb-0 w-1/2">
                        <label htmlFor="telephone" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                            Telephone
                        </label>
                        <input id="telephone" type="text" name="telephone" placeholder="Telephone" value={formState.telephone} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                    </div>
                </div>
                <div className="mb-0 w-full">
                    <label htmlFor="adresse" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                        Adresse
                    </label>
                    <input id="adresse" type="text" name="adresse" placeholder="Adresse" value={formState.adresse} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                </div>
                <div className="flex gap-12 mt-2 max-sm:gap-2">
                    <div className="mb-0 w-1/2">
                        <label htmlFor="ville" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                            Ville
                        </label>
                        <input id="ville" type="text" name="ville" placeholder="Ville" value={formState.ville} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                    </div>
                    <div className="mb-0 w-1/2">
                        <label htmlFor="codePostal" className="block text-gray-700 text-sm font-bold mb-2 max-sm:text-sm">
                            Code Postal
                        </label>
                        <input id="codePostal" type="text" name="codePostal" placeholder="Code Postal" value={formState.codePostal} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline max-sm:text-sm" required />
                    </div>
                </div>
                { !isFormValid && <p className="text-center text-[red]">Veuillez remplir tout les champs</p> }
                {isFormValid && isEmailValid && formState.email ? 
                <div className="flex justify-center">
                    <PaypalButton totalPrice={totalPrice} formState={formState}/>
                </div> 
                : 
                
                <div className="flex justify-center items-center w-full h-[45px] mt-4 max-sm:w-[273px] max-sm:h-[30px]">
                    <div className="flex justify-center items-center bg-[#D3D3D3] w-[320px] h-[45px] max-sm:w-[273px] max-sm:h-[30px] rounded-full">
                    <img className=" w-[69px] h-[20px] " src={paypal_logo_2} alt="paypal_logo"/>
                    </div>
                    
                </div>
                }
            </div>
        </div>
    );
}
