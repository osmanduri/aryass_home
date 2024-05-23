import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import Catalogue from './Pages/Catalogue';
import Contact from './Pages/Contact';
import Footer from './Components/Footer';
import Panier from './Pages/Panier';
import SingleProduct from './Pages/SingleProduct';
import SubscribeToEmail from './Pages/Home/SubscribeToEmail';
import PageConnextion from './Pages/PageConnexion/PageConnextion';
import UserProfil from './Pages/Profile/UserProfil';
import CheckConnected from './Components/PrivateRoute/CheckConnected';
import Cookies from 'universal-cookie';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import {store, persistor } from './redux/store'; // Assurez-vous d'avoir exporté persistor depuis votre fichier store$
import Success from './Pages/StripePage/Success'
import Cancel from './Pages/StripePage/Cancel';
import MentionsLegals from './Pages/Profile/pages/Footer/MentionsLegales';
import QuiSommesNous from './Pages/Profile/pages/Footer/QuiSommesNous';
import PolitiqueRemboursement from './Pages/Profile/pages/Footer/PolitiqueRemboursement';
import PaiementSecurise from './Pages/Profile/pages/Footer/PaiementSecurise';
import CGV from './Pages/Profile/pages/Footer/CGV';

function App() {
  const isAuthenticated = () => {
    const cookies = new Cookies();
    // Vérifiez la présence du token dans les cookies ou utilisez votre logique d'authentification
    const token = cookies.get('token'); // Remplacez 'votre_token' par la clé utilisée pour stocker le token

    return !!token; // Renvoie true si le token est présent, sinon false
  };
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={isAuthenticated() ? <Navigate to="/profil" /> : <PageConnextion/>}/>
            <Route path="/catalogue/:choix_categorie" element={<Catalogue />} />
            <Route path="/catalogue/:choix_categorie/:id" element={<SingleProduct />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/not_found" element={<NotFound />} />
            <Route path="/panier" element={<Panier />} />
            <Route path="/payment_success" element={<Success/>} />
            <Route path="/payment_cancel" element={<Cancel />} />
            <Route path="/mentions_legals" element={<MentionsLegals />} />
            <Route path="/qui_sommes_nous" element={<QuiSommesNous />} />
            <Route path="/retour_produits" element={<PolitiqueRemboursement />} />
            <Route path="/paiement" element={<PaiementSecurise />} />
            <Route path="/cgv" element={<CGV />} />

            {/* Utilisez votre propre logique d'authentification pour conditionner l'accès à la route /profil */}
            <Route element={<CheckConnected/>}>
              <Route path="/profil" element={<UserProfil/>}/>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <SubscribeToEmail />
          <Footer />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
