import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts"
import blogsReducer from "./blogSlice.ts"
export const appStore=configureStore({
    
    reducer:{
            blog:blogsReducer,
            user:userReducer,
    }

})


