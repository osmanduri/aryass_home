import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaSnapchatGhost } from "react-icons/fa";

interface SideBarNavProps {
    isOpen: boolean;
    setShowSideBar: (value: boolean) => void;
}

export default function SideBarNav({ isOpen, setShowSideBar }: SideBarNavProps) {
  useEffect(() => {
    // Fonction pour déterminer si la sidebar doit bloquer le scroll
    const shouldBlockScroll = () => isOpen && window.innerWidth <= 750;

    // Applique ou retire la classe no-scroll
    const updateBodyScroll = () => {
      if (shouldBlockScroll()) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    };

    // Appelle updateBodyScroll lors du montage pour définir l'état initial
    updateBodyScroll();

    // Ajoute un gestionnaire pour le redimensionnement de la fenêtre
    window.addEventListener('resize', updateBodyScroll);

    // Nettoyage : retire le gestionnaire lors du démontage du composant
    return () => window.removeEventListener('resize', updateBodyScroll);
  }, [isOpen]);

  return (
    <div className={`sideBarNav ${isOpen ? 'open' : ''} flex flex-col gap-4`}>
                            <NavLink to="/" className={({isActive}) => isActive ? "nav-active_side" : "non-active-class_side"} onClick={() => setShowSideBar(false)}>
                              ACCUEIL
                            </NavLink>
                            <NavLink to="/catalogue/lit_coffre" className={({isActive}) => isActive ? "nav-active_side": "non-active-class_side" } onClick={() => setShowSideBar(false)}>
                            LIT COFFRE 
                            </NavLink>
                            <NavLink to="/catalogue/lit_cadre" className={({isActive}) => isActive ? "nav-active_side": "non-active-class_side" } onClick={() => setShowSideBar(false)}>
                            LIT CADRE 
                            </NavLink>
                            <NavLink to="/catalogue/matelas_sommier" className={({isActive}) => isActive ? "nav-active_side": "non-active-class_side" } onClick={() => setShowSideBar(false)}>
                            MATELAS & SOMMIER 
                            </NavLink>
                            <NavLink to="/catalogue/canape" className={({isActive}) => isActive ? "nav-active_side": "non-active-class_side" } onClick={() => setShowSideBar(false)}>
                            CANAPÉ
                            </NavLink>
                            <NavLink to="/catalogue/chevet" className={({isActive}) => isActive ? "nav-active_side": "non-active-class_side" } onClick={() => setShowSideBar(false)}>
                            CHEVET
                            </NavLink>
                            <NavLink to="/catalogue/lit_coffre_une_place" className={({isActive}) => isActive ? "nav-active_side": "non-active-class_side" } onClick={() => setShowSideBar(false)}>
                            LIT COFFRE ENFANTS
                            </NavLink>
      <div className={isOpen ? "sideBarNavBottomActive" : "sideBarNavBottom"}>
        <div className="flex justify-center items-center p-8 gap-6">
          <FaFacebook className="cursor-pointer" size={20}/> 
          <FaInstagram className="cursor-pointer" size={20}/> 
          <FaYoutube className="cursor-pointer" size={20}/> 
          <FaSnapchatGhost className="cursor-pointer" size={20}/>
        </div>
  </div>
    </div>
  );
}
