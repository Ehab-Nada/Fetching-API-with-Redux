import { createSlice } from "@reduxjs/toolkit";

const cart = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    changed: false,
  },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const exisiting = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      state.changed = true;
      if (!exisiting) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        exisiting.quantity++;
        exisiting.totalPrice = exisiting.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const exisiting = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      state.changed = true;
      if (exisiting.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exisiting.quantity--;
        exisiting.totalPrice = exisiting.totalPrice - exisiting.price;
      }
    },
  },
});

export const cartActions = cart.actions;
export default cart;
