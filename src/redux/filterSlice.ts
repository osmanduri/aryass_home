import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Définition explicite des types pour l'état initial
interface FilterState {
    dispo: string[]; // dispo est toujours un tableau de strings
    payeOuNonPaye:string[];
    priceMax: number | null;
    priceMin: number | null;
    sortBy: string;
    pending: boolean;
    error: boolean;
    priceMaxProduct:number;
    nbStock:number;
    nbRuptureStock:number;
}

// État initial avec les types spécifiés
const initialState: FilterState = {
    dispo: [], // Initialise dispo comme un tableau vide au lieu de null
    payeOuNonPaye:[],
    priceMax: null,
    priceMin: null,
    sortBy: '',
    pending: false,
    error: false,
    priceMaxProduct:0,
    nbStock:0,
    nbRuptureStock:0
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
        setPayeOuNonPaye:(state, action: PayloadAction<string[]>) => {
            state.payeOuNonPaye = action.payload;
        },
        setPriceMin: (state, action: PayloadAction<number | null>) => {
            state.priceMin = action.payload;
        },
          setPriceMax: (state, action: PayloadAction<number | null>) => {
            console.log(action)
            state.priceMax = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
          },
          updateDetailsProduct: (state, action) => {
            state.priceMaxProduct = action.payload.maxPrice;
            state.nbStock = action.payload.totalEnStock === undefined ? 0 : action.payload.totalEnStock;
            state.nbRuptureStock = action.payload.totalRuptureDeStock === undefined ? 0 : action.payload.totalRuptureDeStock;
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

export const { updateStart, setDispo, setPayeOuNonPaye, setPriceMin, setPriceMax, setSortBy, updateDetailsProduct, updateError, resetState } = filterSlice.actions;
export default filterSlice.reducer;
