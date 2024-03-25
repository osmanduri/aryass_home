// Importez les dépendances nécessaires
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// Importez vos slices
import userSlice from './userSlice';
import filterSlice from './filterSlice';
import panierSlice from './panierSlice';

// Configuration de Redux Persist
const persistConfig = {
  key: 'root',
  storage,
  // Ajoutez d'autres configurations ici si nécessaire, par exemple la liste blanche/noire
};

// Combine reducers
const rootReducer = combineReducers({
  user: userSlice,
  filter: filterSlice,
  panier:panierSlice
  // Ajoutez d'autres reducers ici
});

// Créez un reducer persistant
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configurez le store Redux
const store = configureStore({
  reducer: persistedReducer,
});

// Créez le persistor
const persistor = persistStore(store);

// Exportez à la fois le store et le persistor
export { store, persistor };