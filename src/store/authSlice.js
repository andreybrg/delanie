import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI } from './authAPI'
import { setLocalStorageAuthData, removeLocalStorageAuthData } from './helpers'
import { resetData } from './panelSlice'
import { panelAPI } from './panelAPI'

const initialState = {
    auth: {
        isAuth: false,
        userId: null,
        isError: null,
        errorMessage: null,
        isPending: false
    }
}

export const makeRegistration = createAsyncThunk(
    'auth/makeRegistration',
    async (data, {dispatch}) => {
        try {
            const response = await dispatch(authAPI.endpoints.register.initiate({email: data.email, password: data.password}))
            // response.data.accessToken
            // response.data.user.id
            // response.data.user.email
            // response.error.data — Сообщение о причине
            if(!response.error) {
                setLocalStorageAuthData(response.data.accessToken, response.data.user.id)
                dispatch(setAuthUser({userId: response.data.user.id}))
            } else {
                dispatch(setAuthError({message: response.error.data}))
            }
        } catch (error) {
            dispatch(setAuthError({message: 'Неизвестная ошибка при регистрации. Попробуйте позже'}))
        }
        dispatch(resetData())
    }
)

export const makeLogin = createAsyncThunk(
    'auth/makeLogin',
    async (data, {dispatch}) => {
        try{
            const response = await dispatch(authAPI.endpoints.login.initiate({email: data.email, password: data.password}))
            // response.data.accessToken
            // response.data.user.id
            // response.data.user.email
            // response.error.data — Сообщение о причине
            if(!response.error) {
                setLocalStorageAuthData(response.data.accessToken, response.data.user.id)
                dispatch(setAuthUser({userId: response.data.user.id}))
            } else {
                dispatch(setAuthError({message: response.error.data}))
            }
        } catch (error) {
            dispatch(setAuthError({message: 'Неизвестная ошибка при авторизации. Попробуйте позже'}))
        }
        dispatch(resetData())
        dispatch(panelAPI.util.updateQueryData('getPanelData', undefined, () => []))
    }
)

export const makeLogout = createAsyncThunk(
    'auth/makeLogout',
    async (_, {dispatch}) => {
        removeLocalStorageAuthData()
        dispatch(unsetAuthUser())
        dispatch(resetData())
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthUser(state, action) {
            state.auth = {
                isAuth: true,
                userId: action.payload.userId,
                isError: null,
                errorMessage: null
            }
        },
        unsetAuthUser(state, action) {
            state.auth = {
                isAuth: false,
                userId: null,
                isError: null,
                errorMessage: null
            }
        },
        setAuthError(state, action) {
            state.auth = {
                isAuth: false,
                userId: null,
                isError: true,
                errorMessage: action.payload.message
            }
        },
        resetAuthError(state) {
            state.auth.isError = false
            state.auth.errorMessage = null
        }
    },
    extraReducers: (builder) => {
        builder
        // Login
        .addCase(makeLogin.pending, (state) => {
            state.auth.isPending = true
        })
        .addCase(makeLogin.fulfilled, (state) => {
            state.auth.isPending = false
        })
        // Registration
        .addCase(makeRegistration.pending, (state) => {
            state.auth.isPending = true
        })
        .addCase(makeRegistration.fulfilled, (state) => {
            state.auth.isPending = false
        })
    }
})

export const { setAuthUser, unsetAuthUser, setAuthError, resetAuthError } = authSlice.actions
export default authSlice.reducer