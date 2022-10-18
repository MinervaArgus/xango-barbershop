import { configureStore } from "@reduxjs/toolkit";
import userStateReducer from "./components/global-state/userStateSlice"

export default configureStore({
    reducer: {
        userState: userStateReducer,
    },
})