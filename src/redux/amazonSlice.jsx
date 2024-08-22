import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  userInfo: null,
  isAuthenticated: false,
  searchTerm: "",
};

export const amazonSlice = createSlice({
  name: "amazon",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },

    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item.id !== action.payload
      );
    },

    resetCart: (state) => {
      state.products = [];
    },

    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    setUserInfo: (state, action) => {
      state.isAuthenticated = true
      state.userInfo = action.payload;
    },

    signoutUser: (state) => {
      state.isAuthenticated = false
      state.userInfo = null;
    },
  },
});

export const {
  addToCart,
  deleteItem,
  resetCart,
  increaseQuantity,
  decreaseQuantity,
  setUserInfo,
  signoutUser,
  setSearchTerm,
} = amazonSlice.actions;

export default amazonSlice.reducer;
