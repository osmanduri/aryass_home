import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import NotFound from './Pages/NotFound'
import Header from './Components/Header'
import Navbar from './Components/Navbar'
import Catalogue from './Pages/Catalogue'
import Contact from './Pages/Contact'
import Footer from './Components/Footer'
import { Provider } from 'react-redux';
import store from './redux/store'
import Panier from './Pages/Panier'
import ProductDetails from './Pages/ProductDetails'
import SubscribeToEmail from './Pages/Home/SubscribeToEmail'

function App() {

  return (
    <>
      <Provider store={store}>
      <BrowserRouter>
      <Header/>
      <Navbar/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/catalogue" element={<Catalogue/>}/>
            <Route path="/catalogue/:id" element={<ProductDetails/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/not_found" element={<NotFound/>}/>
            <Route path="/panier" element={<Panier/>}/>
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
          <SubscribeToEmail/>
          <Footer/>
      </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
