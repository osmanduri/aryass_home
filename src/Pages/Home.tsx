import { useState, useEffect } from "react";
import CardsHome from "../Components/CardsHome";
import SliderVideo from "../Components/SliderVideo";
import { card_home } from "../data/cards_home";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import '../style.css';
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { FaCircleArrowRight } from "react-icons/fa6";
import NouvelleCollection from "./Home/NouvelleCollection";
import HomeListeProduits from "./Home/HomeListeProduits";
import ShowHomeProductFeatures from "./Home/ShowHomeProductFeatures";
import axios from 'axios'





export default function Home() {


  const useFetchProducts = () => {
    const [products, setProducts] = useState({
      litCoffre: [],
      litCadre: [],
      canape: [],
    });
  
    useEffect(() => {
      const fetchAllProducts = async () => {
        try {
          const res = await axios.get(`${import.meta.env.VITE_BASE_URL_PROD}/api/product/getAllProduct`);
  
          const newProducts = {
            litCoffre: res.data.filter((e:any) => e.categorie === 'lit_coffre').slice(0, 3),
            litCadre: res.data.filter((e:any) => e.categorie === 'lit_cadre').slice(0, 3),
            canape: res.data.filter((e:any) => e.categorie === 'canape').slice(0, 3),
          };
  
          setProducts(newProducts);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
  
      fetchAllProducts();
    }, []);
  
    return products;
  };

  const { litCoffre, litCadre, canape } = useFetchProducts();
  return (
    <>
      <SliderVideo/>
      <h1 className="text-center text-3xl font-semibold underline mt-24 text-black max-sm:text-lg">NOS CATEGORIES</h1>
      <Swiper
        scrollbar={true}
        slidesPerView={4}
        spaceBetween={0}
        loop={false}
        pagination={false}
        navigation={{
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        }}
        breakpoints={{
          1: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          639: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          768: {
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          950: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
          
          1300: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
        }}
        modules={[Pagination, Navigation, Scrollbar]}
        className="mySwiper mb-4 mt-12 max-w-[1536px] mx-auto"
      >
        {card_home.map((element, index) => (
          <SwiperSlide key={index}>
            <CardsHome element={element} />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Boutons de navigation personnalisés */}
      <div className="flex justify-center gap-4">
        <div className="swiper-button-prev1 cursor-pointer"><FaCircleArrowLeft size={35}/></div>
        <div className="swiper-button-next1 cursor-pointer"><FaCircleArrowRight size={35}/></div>
      </div>
      <div className="mt-44">
      <NouvelleCollection/>
      </div>
      <div className="mt-44">
        <HomeListeProduits titre="Lit coffre" categorie={litCoffre} link="/catalogue/lit_coffre"/>
      </div>
      <div className="mt-44">
        <HomeListeProduits titre="Canapé" categorie={canape} link="/catalogue/canape"/>
      </div>
      <div className="mt-44">
        <HomeListeProduits titre="Cadre de lit" categorie={litCadre} link="/catalogue/lit_cadre"/>
      </div>
      <div className="mt-44">
        <ShowHomeProductFeatures/>
      </div>
      


      
    </>
  );
}
