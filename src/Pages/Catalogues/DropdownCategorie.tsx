import { useState } from 'react';

interface DropdownCategorieProps {
    handleCategorie: (selectedCategories: string[]) => void;
}

export default function DropdownCategorie({ handleCategorie }: DropdownCategorieProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = [
        "LIT COFFRE",
        "LIT CADRE",
        "MATELAS + SOMMIER",
        "CANAPÉ",
        "CHEVET",
        "LIT COFFRE ENFANTS"
    ];

    const handleSelection = (category: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(item => item !== category); // Retirer la catégorie si déjà sélectionnée
            } else {
                return [...prev, category]; // Ajouter la catégorie si pas encore sélectionnée
            }
        });
    };

    // Appeler handleCategorie avec les catégories sélectionnées lorsque l'utilisateur veut filtrer
    const handleFilter = () => {
        handleCategorie(selectedCategories);
    };

    // Réinitialiser les sélections
    const handleReset = () => {
        setSelectedCategories([]);
    };

    return (
        <div className='bg-white w-[348px] h-auto border shadow-md flex flex-col items-center justify-evenly p-4'>
            <div className="flex justify-between items-center w-full mb-2">
                <p className='text-sm'>{selectedCategories.length} sélectionnés</p>
                <span className='text-sm underline cursor-pointer' onClick={handleReset}>Réinitialiser</span>
            </div>
            
            <div className="h-[1px] w-full bg-black opacity-10 mb-2" />
            <div className='flex flex-col items-start w-full' >
                {categories.map((category, index) => (
                    <div  key={index} className="flex items-center w-full mb-2">
                        <input  type="checkbox" id={`checkbox-${category}`} className="cursor-pointer"
                               onChange={() => handleSelection(category)}
                               checked={selectedCategories.includes(category)} />
                        <label htmlFor={`checkbox-${category}`} className="ml-2 text-sm">{category}</label>
                    </div>
                ))}
            </div>
            <p className='text-end w-full bg-black text-white px-6 py-1 text-sm cursor-pointer' onClick={handleFilter}>
                Filtrer
            </p>
        </div>   
    );
}
