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
        
        },
        clearState:(state)=>{
            state.blogs=null;
            state.clickedBlogs=[];
        }
    }

});

export const {getBlogs,cacheTheBlog,clearState}=blogSlice.actions;
export default blogSlice.reducer;