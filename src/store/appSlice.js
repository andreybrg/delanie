import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authAPI } from './authAPI'
import { setAuthUser, unsetAuthUser } from './authSlice'
import { getLocalStorageAuthData, removeLocalStorageAuthData } from './helpers'
import { panelAPI } from './panelAPI'


const initialState = {
    data: {
        isInit: false,
        appData: {
            colorData: []
        }
    },

}


const checkUserAuthentication = async (dispatch) => {
    const { token, userId } = getLocalStorageAuthData()
    if(token) {
        try {
            const response = await dispatch(authAPI.endpoints.checkAuth.initiate({token: token}))
            if(!response.isError) {
                dispatch(setAuthUser({userId: userId}))
            } else {
                removeLocalStorageAuthData()
                dispatch(unsetAuthUser())
            }
            
        } catch {
            
        }
    } else {
        removeLocalStorageAuthData()
        dispatch(unsetAuthUser())
        
    }
}

export const getAppWorkData = createAsyncThunk(
    'app/getAppWorkData',
    async (data, {dispatch}) => {
        const response = await dispatch(panelAPI.endpoints.getAppData.initiate())
        dispatch(setAppData({colorData: response.data.data.colorData}))
    }
)

export const appInitialization = createAsyncThunk(
    'app/appInitialization',
    async (data, {dispatch}) => {
        await checkUserAuthentication(dispatch)
        await dispatch(getAppWorkData())
        dispatch(setAppInit())
    }
)

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppInit(state) {
            state.data.isInit = true
        },
        setAppData(state, action) {
            state.data.appData.colorData = action.payload.colorData
        }
    }
})

export const { setAppInit, setAppData } = appSlice.actions
export default appSlice.reducer