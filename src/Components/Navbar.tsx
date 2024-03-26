import { useState, useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { BsCart } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import MenuNormal from "./Navigation/MenuNormal";
import SideBarNav from "./Navigation/SideBarNav"; // Assurez-vous que ce composant est créé.
import InputSearchBar from "./Navigation/InputSearchBar";
import Logo from "./Navigation/Logo";
import { Link } from "react-router-dom";
import { FaUser, FaUserCheck } from "react-icons/fa";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

export default function Navbar() {
    const [isSearch, setIsSearch] = useState(false);
    const [displayMenuBurger, setDisplayMenuBurger] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false); // Nouvel état pour gérer l'affichage de SideBarNav
    const [showLogoInsteadOfMenu, setShowLogoInsteadOfMenu] = useState(false)
    const [isToken, setIsToken] = useState<boolean>(false)

    //@ts-ignore
    const user = useSelector(state => state.user.userInfo)
     //@ts-ignore
    const panier = useSelector(state => state.panier.articles)

    const showBurgerMenu = () => {
        if(window.innerWidth <= 990){
            setDisplayMenuBurger(false);
            setShowLogoInsteadOfMenu(true)
        }
        else if(window.innerWidth > 990){
            setDisplayMenuBurger(true);
            setShowSideBar(false);
            setShowLogoInsteadOfMenu(false)
        }
    }

    useEffect(() => {
        const cookies = new Cookies();
        const token = cookies.get('token'); // Remplacez 'votre_token' par la clé utilisée pour stocker le token

        if(token){
            setIsToken(true)
        }else{
            setIsToken(false)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => showBurgerMenu();
        window.addEventListener('resize', handleResize);

        // Appel initial pour définir l'état correct au montage du composant
        showBurgerMenu();

        // Nettoyage de l'écouteur d'événement au démontage du composant
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShowSideBarNav = (isOpen: boolean) => {
        setShowSideBar(isOpen);
    };

    // Gérer l'état de défilement du body
    useEffect(() => {
        if (isSearch) {
            // Désactiver le défilement
            document.body.style.overflow = 'hidden';
        } else {
            // Activer le défilement
            document.body.style.overflow = 'visible';
        }

        // Nettoyer en réactivant le défilement quand le composant est démonté
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [isSearch]);
  


    return (
        <>
            <div className="max-w-[1536px] mx-auto bg-[white] h-[226px] flex items-center">
                <div className={isSearch ? "searchBarActive" : "searchBar"}>
                    <InputSearchBar/>
                    <div onClick={() => setIsSearch(false)} className="cursor-pointer ml-4 mt-[40px]"><RxCross1/></div>
                </div>
                <div className="flex justify-between items-center pl-10 pr-10 pt-20 pb-10         max-sm:pl-6 max-sm:pr-6 max-sm:pt-20 max-sm:pb-10 w-full">

                {
                        displayMenuBurger ? <Logo/> : <> { !showSideBar ? <div className="w-[256px]"><RxHamburgerMenu size={25} className="cursor-pointer" onClick={() => handleShowSideBarNav(true)}/></div> : <div className="w-[256px]"><RxCross1 size={25} className="cursor-pointer" onClick={() => handleShowSideBarNav(false)} /></div> }</>
                    }
  
                    {
                        showLogoInsteadOfMenu ? <Logo/> : <MenuNormal/>
                    }

                    <div className="flex gap-8 w-[256px] justify-end max-sm:gap-4">
                        <div className="cursor-pointer" onClick={() => setIsSearch(!isSearch)}>
                            <IoIosSearch size={25}/>
                        </div>
                        <div>
                            { !isToken ? <Link to="/login"><FaUser size={21} className="cursor-pointer"/></Link> : <Link to="/profil"><FaUserCheck size={26} className="cursor-pointer"/></Link>}
                        </div>
                        <div className="cursor-pointer relative">
                            <Link to="/panier" className="relative flex justify-center items-center">
                                <BsCart size={21} />
                                <p className="absolute bottom-2 left-5 rounded-full w-[20px] h-[20px] text-white flex justify-center items-center text-xs" style={user ? {background:"black"} : {background:"white"}}>{panier.length}</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <SideBarNav isOpen={showSideBar} setShowSideBar={setShowSideBar}/> {/* Conditionnellement rendre SideBarNav basé sur showSideBar */}
        </>
    );
}
