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
        await axios.get(`http://localhost:5005/api/payment/verify-payment/${sessionId}`)
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

    }
  }, [sessionId, dispatch, navigate]);

  return (
    <div className='text-center'>
      Merci pour votre achat ! Votre paiement a été effectué avec succès.
    </div>
  );
};

