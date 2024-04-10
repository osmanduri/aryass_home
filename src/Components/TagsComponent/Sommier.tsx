export default function Sommier({ options, handleChangeOption, select }:any) {
    return (
        <div>
          <p className="font-semibold">Sommier:</p>
          <div className="flex flex-wrap items-center gap-2 mb-4 mt-2">
            {options.map((option:any, index:number) => (
              <div
                key={index}
                className={`cursor-pointer border border-black px-6 py-3 max-lp:px-2 max-lp:py-1 rounded-full text-sm ${
                  select.find((element:any) => element.valeur === option.valeur)  ? "bg-black text-white" : ""
                }`}
                onClick={() => handleChangeOption(option)}
              >
                {option.valeur}
              </div>
            ))}
          </div>
        </div>
      );
}
