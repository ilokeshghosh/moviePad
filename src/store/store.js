import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./categorySlice";
import errorSlice from "./errorSlice";
const store = configureStore({
    reducer:{
        categories:categorySlice,
        errorReducer:errorSlice
    }
})

export default store