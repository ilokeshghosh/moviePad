import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        }
    }

})

export const { setCategory } = categorySlice.actions

export default categorySlice.reducer;