import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"; 
import cartReducer from "./cartSlice"; 

const store = configureStore({
  reducer: {
    auth: authReducer,  // ✅ Manages authentication state
    cart: cartReducer,  // ✅ Manages cart state
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Prevents Redux warnings for non-serializable values
    }),
  devTools: process.env.NODE_ENV !== "production", // ✅ Enables Redux DevTools in development mode
});

export default store;
