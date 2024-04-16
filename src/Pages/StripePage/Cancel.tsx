import redCross from "/check/red_cross.png"

export default function Cancel() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center max-sm:w-[90%] mx-auto">
        <div className="flex justify-center"> <img className='w-12' src={redCross} alt="check"/> </div>
        <h2 className="text-2xl font-bold mb-2">Paiement annulé !</h2>
        <p className="mb-4 text-gray-600">Votre paiement a été annulé et n'a pas été pris en compte.</p>
        <a href="/"
           className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
}
