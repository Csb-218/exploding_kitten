import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: '/' })
const AuthSlice = createSlice({
    name : "auth" , 
    initialState : {
        isLoggedIn : false,
        token : null,
        name:null,
        email:null,
        id:null,

    },
    reducers:{
        login(state,action){
            //console.log(action)
            state.token = action?.payload?.token
            // decoding token
            const decoded = jwtDecode(action?.payload?.token)
            state.name = decoded?.data?.name
            state.email = decoded?.data?.email
            state.id = decoded?.data?.id
            state.isLoggedIn = true
            cookies.set('token',action?.payload?.token)
        }
        ,
        logout(state,action){
            state.isLoggedIn = false
            state.token = null
            state.name = null
            state.email = null
            state.id = null
        }
    }
})

export const authActions = AuthSlice.actions

export default AuthSlice