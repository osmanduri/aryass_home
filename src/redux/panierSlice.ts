// panierSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PanierItem {
  _id: string | undefined;
  nomProduit: string | undefined;
  categorie: string | undefined;
  prix: number | undefined;
  quantite: number;
  img: string[] | undefined;
  tags:any;
}

interface PanierState {
  articles: PanierItem[];
}

// État initial du panier
const initialState: PanierState = {
  articles: [],
};

const panierSlice = createSlice({
  name: 'panier',
  initialState,
  reducers: {
    // Ajouter un article au panier ou augmenter sa quantité
    ajouterArticle: (state, action: PayloadAction<PanierItem>) => {
      console.log('ajouterArticle !')
      const existingArticle = state.articles.find(article => article._id === action.payload._id);
      if (existingArticle) {
        existingArticle.quantite++;
      } else {
        state.articles.push({ ...action.payload, quantite: 1 });
      }
    },
    // Ajouter un article au panier selon une quantité spécifique
    ajouterArticleSelonQuantite: (state, action: PayloadAction<PanierItem>) => {
      const existingArticle = state.articles.find(article => article._id === action.payload._id);
      if (existingArticle) {
        existingArticle.quantite += action.payload.quantite;
      } else {
        state.articles.push(action.payload);
      }
    },
    // Supprimer un article du panier
    supprimerArticle: (state, action: PayloadAction<string>) => {
      state.articles = state.articles.filter(article => article._id !== action.payload);
    },
    // Augmenter la quantité d'un article dans le panier
    increaseArticle: (state, action: PayloadAction<string>) => {
      const existingArticle = state.articles.find(article => article._id === action.payload);
      if (existingArticle) {
        existingArticle.quantite++;
      }
    },
    // Réduire la quantité d'un article dans le panier
    decreaseArticle: (state, action: PayloadAction<string>) => {
      const existingArticle = state.articles.find(article => article._id === action.payload);
      if (existingArticle && existingArticle.quantite > 1) {
        existingArticle.quantite--;
      } else if (existingArticle && existingArticle.quantite === 1) {
        state.articles = state.articles.filter(article => article._id !== action.payload);
      }
    },
    // Vider le panier
    viderPanierRedux: state => {
      state.articles = [];
    },
  },
});

export const {
  ajouterArticle,
  supprimerArticle,
  increaseArticle,
  decreaseArticle,
  ajouterArticleSelonQuantite,
  viderPanierRedux,
} = panierSlice.actions;

export default panierSlice.reducer;
