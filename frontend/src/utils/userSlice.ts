import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:"user",
    initialState:{
        isLoggedin:false,
    },
    reducers:{
        loginUser:(state,action)=>{
            state.isLoggedin=action.payload;
        },
        
    }
})

export const {loginUser}=userSlice.actions;
export default userSlice.reducer;