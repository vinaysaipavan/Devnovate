import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authReducer";
import { videoReducer } from "./video/videoReducer";

export const store = configureStore({
    reducer : {
        auth : authReducer,
        video : videoReducer
    },
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;