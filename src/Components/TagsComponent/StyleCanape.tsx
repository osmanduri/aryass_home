
export default function StyleCanape({ options, select, handleChangeOption }:any) {

    return (
        <div>
          <p className="font-semibold">Orientation:</p>
          <div className="flex gap-2 mb-4 mt-0">
            {options.map((option:any, index:number) => (
              <button
                key={index}
                className={`border border-black px-6 py-2 rounded-full max-lp:px-2 max-lp:py-1 max-lp:text-sm ${
                  select.find((element:any) => element.valeur === option.valeur)  ? "bg-black text-white" : ""
                }`}
                onClick={() => handleChangeOption(option)}
              >
                {option.valeur}
              </button>
            ))}
          </div>
        </div>
      );
}
