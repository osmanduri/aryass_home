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

export default function Navbar() {
    const [isSearch, setIsSearch] = useState(false);
    const [displayMenuBurger, setDisplayMenuBurger] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false); // Nouvel état pour gérer l'affichage de SideBarNav
    const [showLogoInsteadOfMenu, setShowLogoInsteadOfMenu] = useState(false)

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
                        <div className="cursor-pointer">
                            <Link to="/panier"><BsCart size={21} /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <SideBarNav isOpen={showSideBar} setShowSideBar={setShowSideBar}/> {/* Conditionnellement rendre SideBarNav basé sur showSideBar */}
        </>
    );
}
