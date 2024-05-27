
import { Link } from "react-router-dom";
import koltuk_noir from '/home/1.png'
import chaise from '/home/2.png'
import chaise_many from '/home/3.png'
import chaise_many_petit from '/home/chaise_many_petit.png'
import chaise_grande from '/home/chaise_grande.png'
const Cta3 = () => {
    return (
        <div className="max-w-[1536px] mx-auto flex justify-center items-center py-12 px-4 sm:px-6 2xl:px-0 bg-[#F3F3F3]">
            <div className="flex flex-col lg:flex-row justify-center items-center">
                <div className="w-80 sm:w-auto flex flex-col justify-start items-start">
                    <div>
                        <p className="text-3xl xl:text-4xl font-semibold leading-9 text-gray-800">Rénovez votre maison</p>
                    </div>
                    <div className="mt-4 lg:w-4/5 xl:w-3/5">
                        <p className="text-base leading-6 text-gray-600">Transformez votre salon en un havre de paix et d'élégance avec notre collection de meubles raffinés et de décorations contemporaines</p>
                    </div>
                    <div className="mt-16 w-full ">
                    <Link to="/catalogue/canape" className="text-xl font-medium leading-5 text-white">
                        <div className="px-4 bg-gray-900 flex justify-between items-center w-full lg:w-72 h-14 text-white hover:bg-gray-700">
                            Voir plus
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.66663 16H25.3333" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 21.3333L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M20 10.6667L25.3333 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row jusitfy-center items-center sm:space-x-5 xl:space-x-8 space-y-4 sm:space-y-0">
                    <div>
                        <img className="hidden lg:block" src={koltuk_noir} alt="sofa" />
                        <img className="w-80 sm:w-auto lg:hidden" src={koltuk_noir} alt="sofa" />
                    </div>
                    <div className="flex flex-col justify-center items-center space-y-4 sm:space-y-0 sm:space-y-5 lg:space-y-5 xl:space-y-8">
                        <div>
                            <img className="hidden lg:block" src={chaise} alt="chairs" />
                            <img className="w-80 sm:w-auto lg:hidden" src={chaise_many} alt="chairs" />
                        </div>
                        <div>
                            <img className="hidden lg:block" src={chaise_many_petit} alt="chairs" />
                            <img className="w-80 sm:w-auto lg:hidden" src={chaise_grande} alt="chairs" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cta3;
