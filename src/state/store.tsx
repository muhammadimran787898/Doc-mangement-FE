import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from "./Loading/reducer";
import UserSlice from "./user/reducer";

const store = configureStore({
  reducer: {
    loadingreducer: loadingSlice,
    userReducer: UserSlice,
  },
});

export default store;
