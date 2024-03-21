import logo from '/logo/arya_s_home.svg'
import { FaFacebook, FaInstagram, FaSnapchatGhost } from "react-icons/fa";

export default function Footer() {
  return (
<footer className="px-4 divide-y dark:bg-gray-800 dark:text-gray-100 mt-36">
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
						<a rel="noopener noreferrer" href="#" className='hover:underline'>LIT COFFRE</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>LIT CADRE</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>MATELAS & SOMMIER</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>CANAPÉ</a>
					</li>
                    <li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>CHEVET</a>
					</li>
                    <li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>LIT COFFRE ENFANTS</a>
					</li>
				</ul>
			</div>
            <div className="space-y-3">
				<div className="uppercase dark:text-gray-50">Social media</div>
				<div className="flex justify-start space-x-3">
					<a rel="noopener noreferrer" href="#" title="Facebook" className="flex items-center p-1">
                    <FaFacebook size={20}/>
					</a>
					<a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
                    <FaInstagram size={20}/>
					</a>
                    <a rel="noopener noreferrer" href="#" title="Instagram" className="flex items-center p-1">
                    <FaSnapchatGhost size={20}/>
					</a>
				</div>
			</div>
			<div className="space-y-3">
				<h3 className="tracking-wide uppercase dark:text-gray-50">Company</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>Mentions légales</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>Charte RGPD</a>
					</li>
                    <li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>Charte RGPD</a>
					</li>
				</ul>
			</div>
			<div className="space-y-3">
				<h3 className="uppercase dark:text-gray-50">CONTACT</h3>
				<ul className="space-y-1">
					<li>
						<a rel="noopener noreferrer" href="#">61 rue jean moulin garges les gonesse</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>osman.duri@hotmail.fr</a>
					</li>
					<li>
						<a rel="noopener noreferrer" href="#" className='hover:underline'>0627024424</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div className="py-6 text-sm text-center dark:text-gray-400">© 2024 Company Co. All rights reserved.</div>
</footer>
  )
}
