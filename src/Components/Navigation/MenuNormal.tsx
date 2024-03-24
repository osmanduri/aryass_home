
import { NavLink } from "react-router-dom"

export default function MenuNormal() {
  return (
    <div className="flex flex-wrap items-center gap-8">
                            <NavLink to="/" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                                    Accueil
                            </NavLink>
                            <NavLink to="/catalogue/lit_coffre" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            LIT COFFRE 
                            </NavLink>
                            <NavLink to="/lit_cadre" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            LIT CADRE 
                            </NavLink>
                            <NavLink to="/matelat" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            MATELAS & SOMMIER 
                            </NavLink>
                            <NavLink to="/canape" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CANAPÉ
                            </NavLink>
                            <NavLink to="/chevet" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CHEVET
                            </NavLink>
                            <NavLink to="/lit_coffre_enfant" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            LIT COFFRE ENFANTS
                            </NavLink>
                            <NavLink to="/contact" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CONTACT
                            </NavLink>
    </div>
  )
}
