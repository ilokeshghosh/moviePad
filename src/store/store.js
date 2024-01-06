import { configureStore } from "@reduxjs/toolkit";

import categorySlice from "./categorySlice";
const store = configureStore({
    reducer:{
        category:categorySlice
    }
})

export default store