import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./auth-slice";
import CardSlice from "./card-slice";

const store = configureStore({
    reducer:{
        auth : AuthSlice.reducer,
        cards : CardSlice.reducer
    }
})

export default store