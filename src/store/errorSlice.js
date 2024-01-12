import { createSlice } from "@reduxjs/toolkit";

const initialState={
    errorText:'',
    isError:false
}

const errorSlice = createSlice({
    name:'errorSlice',
    initialState,
    reducers:{
        updateStatus:(state,actions)=>{
            state.isError  = true;
            state.errorText = actions.payload;
        },
        clearStatus:(state)=>{
            state.isError = false;
            state.errorText = '';
        }
    }
})

export const {updateStatus,clearStatus} = errorSlice.actions;

export default errorSlice.reducer;