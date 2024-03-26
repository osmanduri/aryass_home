

export default function ChoixMatelat({ options, selectedMattress, onSelect }:any) {
  
    return (
        <div>
          
          <div className="flex flex-wrap items-center gap-2 mb-4 mt-4">
            {options.map((option:any, index:number) => (
              <button
                key={index}
                className={`border border-black px-3 py-2 max-lp:px-2 max-lp:py-1 rounded-full text-sm ${
                  selectedMattress === option.valeur ? "bg-black text-white" : ""
                }`}
                onClick={() => onSelect(option)}
              >
                {option.valeur}
              </button>
            ))}
          </div>
        </div>
      );
  
}
