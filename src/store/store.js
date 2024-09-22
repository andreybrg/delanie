import { configureStore } from "@reduxjs/toolkit"
import { panelAPI } from "./panelAPI"
import { authAPI } from "./authAPI"
import alertSlice from "./alertSlice"
import panelSlice from "./panelSlice"
import appSlice from "./appSlice"
import authSlice from "./authSlice"

const store = configureStore({
    reducer: {
        alert: alertSlice,
        panel: panelSlice,
        app: appSlice,
        auth: authSlice,
        [panelAPI.reducerPath]: panelAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(panelAPI.middleware)
            .concat(authAPI.middleware)
})

export default store

window.reduxStore = store