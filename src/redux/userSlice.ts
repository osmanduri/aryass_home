import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id?: string;
  nom: string;
  prenom: string;
  email: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  codePostal?:string;
  gender?:string;
  dateNaissance?:string;
  password: string;
  isAdmin: boolean;
  date_creation_user?: string;
  profil_img?: string;
}

interface UserState {
  userInfo: User | null;
  status: {
    pending: boolean;
    error: boolean;
  };
}

const initialState: UserState = {
  userInfo: null,
  status: {
    pending: false,
    error: false,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateStart: (state) => {
      state.status.pending = true;
    },
    updateSuccess: (state, action: PayloadAction<User>) => {
      console.log(action.payload)
      state.status.pending = false;
      state.userInfo = action.payload;
      state.status.error = false;
    },
    updateError: (state) => {
      state.status.error = true;
      state.status.pending = false;
    },
    disconnectUser: (state) => {
      state.userInfo = null;
    },
    // Ajoutez plus de reducers si nécessaire
  },
});

// Actions exportées pour être utilisées dans les composants ou les thunks
export const { updateStart, updateSuccess, updateError, disconnectUser } = userSlice.actions;

// Le reducer exporté pour être inclus dans le store Redux
export default userSlice.reducer;