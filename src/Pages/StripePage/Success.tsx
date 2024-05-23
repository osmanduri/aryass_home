import check from "/check/checked_valid.png"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { viderPanierRedux } from '../../redux/panierSlice';
import axios from 'axios';


export default function Payment() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Utilisez useNavigate ici
  const queryParams = new URLSearchParams(window.location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // Optionnel : Vérifiez auprès de votre backend que le paiement pour cette session est confirmé
      // Exemple: fetch(`/api/payment/verify/${sessionId}`).then(...)
      const verifyPayment = async () => {
        await axios.get(`${import.meta.env.VITE_BASE_URL_PROD}/api/payment/verify-payment/${sessionId}`)
        .then((res) => {
          console.log(res.data)

          if(res.data.success){
            dispatch(viderPanierRedux());
          }else{
            navigate('/');
          }
        })
        .catch(err => {
          console.log(err)
          navigate('/');
        }) 
      }

      verifyPayment();

    }else{
      console.log('Pas de sessionId !')
    }
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-sm:w-[90%] mx-auto">
        <div className="flex justify-center"> <img className='w-12' src={check} alt="check"/> </div>
        <h2 className="text-2xl font-bold mb-2">Paiement réussi!</h2>
        <p className="mb-4 text-gray-600">Merci pour votre achat ! Votre paiement a été effectué avec succès.</p>
        <a href="/"
           className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

