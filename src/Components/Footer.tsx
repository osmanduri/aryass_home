import logo from '/logo/arya_s_home.svg'
import { FaFacebook, FaInstagram, FaSnapchatGhost, FaTiktok  } from "react-icons/fa";

export default function Footer() {
  return (
<footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100 mt-4">
	<div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
		<div className="lg:w-1/3">
			<a rel="noopener noreferrer" href="/" className="flex justify-center lg:justify-start">
				<div className="w-[250px]">
                <img src={logo} alt="logo"/>
				</div>
			</a>
		</div>
		<div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-50">CATEGORIES</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="/catalogue/lit_coffre" className='hover:underline'>LIT COFFRE</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/catalogue/lit_cadre" className='hover:underline'>LIT CADRE</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/catalogue/matelas_sommier" className='hover:underline'>MATELAS & SOMMIER</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/catalogue/canape" className='hover:underline'>CANAPÉ</a>
					</li>
                    <li>
						<a rel="noopener noreferrer" href="/catalogue/chevet" className='hover:underline'>CHEVET</a>
					</li>
                    <li>
						<a rel="noopener noreferrer" href="/catalogue/lit_coffre_une_place" className='hover:underline'>LIT COFFRE ENFANTS</a>
					</li>
				</ul>
			</div>
            <div className="space-y-3">
				<div className="uppercase dark:text-gray-50">Reseaux sociaux</div>
				<div className="flex justify-start space-x-3">
					<a rel="noopener noreferrer" href="https://www.facebook.com/people/ARYAS-HOME/61553468086308/" target="_blank" title="Facebook" className="flex items-center p-1">
                    <FaFacebook size={20}/>
					</a>
					<a rel="noopener noreferrer" href="https://www.instagram.com/home_aryas/" target="_blank" title="Instagram" className="flex items-center p-1">
                    <FaInstagram size={20}/>
					</a>
                    <a rel="noopener noreferrer" href="/" title="Instagram" className="flex items-center p-1">
                    <FaSnapchatGhost size={20}/>
					</a>
					<a rel="noopener noreferrer" href="https://www.tiktok.com/@aryas.home" target="_blank" title="Instagram" className="flex items-center p-1">
                    <FaTiktok size={20}/>
					</a>
					
				</div>
			</div>
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-50">Company</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="/qui_sommes_nous" className='hover:underline'>Qui sommes-nous ?</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/chartre_rgpd" className='hover:underline'>Charte RGPD</a>
					</li>
                    <li>
						<a rel="noopener noreferrer" href="/mentions_legals" className='hover:underline'>Mentions légales</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/cgv" className='hover:underline'>CGV</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/retour_produits" className='hover:underline'>Retour des produits</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="/paiement" className='hover:underline'>Paiement</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="uppercase dark:text-gray-50">CONTACT</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">23 Bd de la Muette<br/>Garges-lès-Gonesse<br/>95140</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="mailto:support@aryas-home.fr" className='hover:underline'>support@aryas-home.fr</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="tel:0767378435" className='hover:underline'>0767378435</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center dark:text-gray-400">© 2024 Company Co. All rights reserved. Osman Duri</div>
</footer>
  )
}
