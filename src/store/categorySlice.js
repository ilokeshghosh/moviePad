import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieCategory: [],
    tvCategory: []

}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setMovieCategory: (state, action) => {
            state.movieCategory = action.payload
        },
        setTvCategory: (state, action) => {
            state.tvCategory = action.payload
        }
    }

})

export const { setMovieCategory,setTvCategory } = categorySlice.actions

export default categorySlice.reducer;