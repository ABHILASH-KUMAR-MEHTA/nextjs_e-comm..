import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IProduct {
  id: string;
  title: string;
  img: string;
  price: number;
  quantity: number;
}

const initialState: Array<IProduct> = [];

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<IProduct>) => {
      const productIndex = state.findIndex(
        (pro) => pro.id === action.payload.id
      );

      if (productIndex === -1) {
        // If the product is not in the cart, add it
        state.push(action.payload);
      } else {
        // If the product exists, increment the quantity
        state[productIndex].quantity += 1;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the product with the given ID
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
