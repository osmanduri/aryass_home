
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
                            <NavLink to="/catalogue/lit_cadre" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CADRE DE LIT 
                            </NavLink>
                            <NavLink to="/catalogue/matelas_sommier" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            MATELAS & SOMMIER 
                            </NavLink>
                            <NavLink to="/catalogue/canape" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CANAPÉ
                            </NavLink>
                            <NavLink to="/catalogue/chevet" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CHEVET
                            </NavLink>
                            <NavLink to="/catalogue/lit_coffre_une_place" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            LIT COFFRE SINGLE
                            </NavLink>
                            <NavLink to="/contact" className={({isActive}) => isActive ? "nav-active": "non-active-class" }>
                            CONTACT
                            </NavLink>
    </div>
  )
}
