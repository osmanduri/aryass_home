import { useDispatch } from 'react-redux';
import { setSortBy } from '../../redux/filterSlice';
import { useEffect } from 'react';

interface DropdownTrierProps {
  width?:number;
}

export default function DropdownTrier({ width }: DropdownTrierProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSortBy('Prix: faible à élevé'))
  }, [])

  const style = {
    width:width
  }

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;

    dispatch(setSortBy(selectedSort)); // Dispatcher le choix de l'utilisateur
  };

  return (
    <div className="flex space-x-4 items-center">
      <span className="font-semibold text-sm">Trier par :</span>
      <select
        onChange={handleSortChange}
        className={`px-4 py-2 border border-gray-300 rounded shadow-sm cursor-pointer bg-white outline-none text-sm`}
        style={style}
      >
        <option>En vedette</option>
        <option>Meilleurs ventes</option>
        <option>Alphabétique, de A à Z</option>
        <option>Alphabétique, de Z à A</option>
        <option>Prix: faible à élevé </option>
        <option>Prix: élevé à faible</option>
        <option>Date, de la plus ancienne à la plus récente</option>
        <option>Date, de la plus récente à la plus ancienne</option>
      </select>
    </div>
  );
}

