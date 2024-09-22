import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    microalerts: {
        list: [],
    }
}

export const setNewMicroalert = createAsyncThunk(
    'alert/setNewMicroalert',
    async (data, thunkAPI) => {
        thunkAPI.dispatch(setMicroalert({text: data.text}))
        thunkAPI.dispatch(delLastMicroalert())
    },
)

export const delLastMicroalert = createAsyncThunk(
    'alert/delLastMicroalert',
    async (data, thunkAPI) => {
        setTimeout(()=>{
            thunkAPI.dispatch(removeLastMicroalert())
        }, 3000)
    },
)

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setMicroalert(state, action) {
            state.microalerts.list.push({text: action.payload.text})
        },
        removeLastMicroalert(state, action) {
            state.microalerts.list.shift()
        }
    }
})

export const { setMicroalert, removeLastMicroalert } = alertSlice.actions
export default alertSlice.reducer