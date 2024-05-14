import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {  BlogState, blogsType } from './type';


const initialState:BlogState={
    blogs:null,
    clickedBlogs:[],
}
const blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{
        getBlogs:(state,action:PayloadAction<blogsType[]>)=>{
            state.blogs=action.payload;
        },
        cacheTheBlog:(state,action:PayloadAction<blogsType>)=>{
            state.clickedBlogs.push(action.payload);
        
        }
    }

});

export const {getBlogs,cacheTheBlog}=blogSlice.actions;
export default blogSlice.reducer;