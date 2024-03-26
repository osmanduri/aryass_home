

export default function Taille({ options, selectedSize, onSelect }:any) {
    return (
        <div>
          <p className="font-semibold">Taille</p>
          <div className="flex gap-4">
            {options.map((option:any, index:number) => (
              <button
                key={index}
                className={`border border-black px-6 py-2 rounded-full ${
                  selectedSize === option.valeur ? "bg-black text-white" : ""
                }`}
                onClick={() => console.log(option)}
              >
                {option.valeur}
              </button>
            ))}
          </div>
        </div>
      );
}
