import { useEffect, RefObject } from 'react';

const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]); // Assurez-vous d'inclure `ref` et `callback` dans les dépendances de l'effet pour qu'il se mette à jour si ceux-ci changent
};

export default useOutsideClick;