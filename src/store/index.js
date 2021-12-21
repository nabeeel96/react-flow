import { configureStore } from "@reduxjs/toolkit";

import elementsSlice from "./slices/elements";

const store = configureStore({
  reducer: {
    allElements: elementsSlice
  }
});

export default store;
