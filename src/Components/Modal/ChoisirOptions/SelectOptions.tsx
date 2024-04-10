interface SelectOptionProps {
    handleChangeOption: (choixUser: any) => void;
    element: {
      _id: string;
      nomProduit: string;
      categorie: string;
      prix: number;
      img: [string];
      tags: any[];
    };
    type: string;
  }



 export const SelectOption: React.FC<SelectOptionProps> = ({ handleChangeOption, element, type }) => {
    return (
        <select
        className="cursor-pointer appearance-none block w-[200px] bg-transparent border-0 border-b border-gray-300 text-gray-700 py-2 px-1 leading-tight focus:outline-none focus:border-3"
        onChange={(e) => handleChangeOption(element.tags[parseInt(e.target.value)])}>
        {
          element.tags.map((tag:any, index:number) => {
            if(tag.type !== type){
              return null; // Utilise null pour les éléments non rendus
            }
            return (
              // Utilise l'index comme clé temporaire, mais il vaut mieux utiliser un identifiant unique si disponible
              <option className='' key={tag.id} value={index}>{tag.valeur}</option>
            )
          })
        }
      </select>
      )
}
