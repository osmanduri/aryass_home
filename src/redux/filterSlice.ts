import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition explicite des types pour l'état initial
interface FilterState {
    dispo: string[]; // dispo est toujours un tableau de strings
    priceMax: number | null;
    priceMin: number | null;
    sortBy: string;
    pending: boolean;
    error: boolean;
}

// État initial avec les types spécifiés
const initialState: FilterState = {
    dispo: [], // Initialise dispo comme un tableau vide au lieu de null
    priceMax: null,
    priceMin: null,
    sortBy: '',
    pending: false,
    error: false,
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        updateStart: (state) => {
            state.pending = true;
            state.error = false;
        },
        setDispo: (state, action: PayloadAction<string[]>) => {
            state.dispo = action.payload;
        },
        setPriceMin: (state, action: PayloadAction<number | null>) => {
            state.priceMin = action.payload;
        },
          setPriceMax: (state, action: PayloadAction<number | null>) => {
            state.priceMax = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
          },
        updateError: (state) => {
            state.error = true;
            state.pending = false;
        },
        resetState: (state) => {
            state.dispo = []; // Réinitialise dispo comme un tableau vide
            state.priceMin = null;
            state.priceMax = null;
            state.pending = false;
            state.error = false;
        },
        // Ajoutez ou ajustez les autres reducers selon vos besoins.
    },
});

export const { updateStart, setDispo, setPriceMin, setPriceMax, setSortBy, updateError, resetState } = filterSlice.actions;
export default filterSlice.reducer;
