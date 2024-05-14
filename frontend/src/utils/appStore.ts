import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "./blogSlice.ts"
export const appStore=configureStore({

    reducer:{
            blog:blogsReducer,
    }

})


