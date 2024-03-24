// panierSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PanierItem {
  _id: string;
  nomProduit:string;
  categorie: string;
  prix: string;
  quantite: number;
  img: string[];
}

interface PanierState {
  articles: PanierItem[];
}

interface QuantiteChangePayload {
    _id: string;
    quantiteChange: number; // Combien ajouter ou soustraire à la quantité
  }
  

const initialState: PanierState = {
  articles: [],
};

const panierSlice = createSlice({
  name: "panier",
  initialState,
  reducers: {
    ajouterArticle: (state, action: PayloadAction<PanierItem>) => {
      const index = state.articles.findIndex(article => article._id === action.payload._id);
      if (index !== -1) {
        // Si l'article existe déjà, augmenter la quantité
        state.articles[index].quantite += action.payload.quantite;
      } else {
        // Sinon, ajouter le nouvel article
        state.articles.push(action.payload);
      }
    },
    supprimerArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(article => article._id !== action.payload);
    },
    increaseArticle: (state, action: PayloadAction<QuantiteChangePayload>) => {
        const article = state.articles.find(article => article._id === action.payload._id);
        if (article) {
          article.quantite += action.payload.quantiteChange;
        }
      },
    decreaseArticle: (state, action: PayloadAction<QuantiteChangePayload>) => {
        const article = state.articles.find(article => article._id === action.payload._id);
        if (article && article.quantite > action.payload.quantiteChange) {
          // Empêche la quantité de devenir négative
          article.quantite -= action.payload.quantiteChange;
        } else if (article) {
          // Si la décrémentation demandée dépasse la quantité actuelle, optionnellement retirer l'article du panier
          // Ou le régler à 1 ou un autre comportement selon la logique métier souhaitée
          article.quantite = 1; // Ou autre logique
        }
      },
    viderPanier: (state) => {
      state.articles = [];
    },
    // Ajoutez plus de reducers selon vos besoins...
  },
});

export const { ajouterArticle, supprimerArticle, increaseArticle, decreaseArticle , viderPanier } = panierSlice.actions;
export default panierSlice.reducer;
