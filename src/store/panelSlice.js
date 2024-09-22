import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { panelAPI } from './panelAPI'
import { setNewMicroalert } from './alertSlice'

const initialState = {
    data: []
}

export const deleteSingleTask = createAsyncThunk(
    'panel/deleteSingleTask',
    async (data, {dispatch, getState}) => {
        try {
            // Удаляю таск из базы
            const response = await dispatch(panelAPI.endpoints.deleteTask.initiate({id: data.taskId}))
            
            if(!response.error) {
                // Операция со стейтом (filter) + переназначаю индексы (map)
                const panelState = getState()
                
                const group = panelState.panel.data.find(el => el.group.id === data.groupId)
                
                const taskList = group.tasks
                    .filter(task => task.id !== data.taskId)
                    .map((task, index) =>
                            ({
                                ...task,
                                position: index
                            })
                        )

                // сетаю новый tasklist группы в стейт
                dispatch(setTasklistAfterRemoveSingleTask({groupId: data.groupId, taskList: taskList}))
                await dispatch(panelAPI.endpoints.updateTasksPositions.initiate({data: taskList}))
                dispatch(setNewMicroalert({text: 'Задача успешно удалена'}))
            } else {
                // throw Error()
            }
            
        } catch (error) {
            console.log(error)
        }
    }
)

export const changeTaskPosition = createAsyncThunk(
    'panel/changeTaskPosition',
    async (data, {dispatch, getState}) => {
        try {
            
            const panelState = getState().panel
            const fromGroupIndex = panelState.data.findIndex(el=>el.group.id === data.fromGroupId)
            const toGroupIndex = panelState.data.findIndex(el=>el.group.id === data.toGroupId)
            const task = panelState.data[fromGroupIndex].tasks.find(el=>el.id === data.taskId)
            
            dispatch(setUpdatedTaskPosition(
                {
                    task: task,
                    ...data
                }
            ))

            // Обновить позиции тасок
            // Обновить группы тасок
            
            const panelStateAfter = getState().panel
            const fromGroupTasks = panelStateAfter.data[fromGroupIndex].tasks
            const toGroupTasks = panelStateAfter.data[toGroupIndex].tasks
            await dispatch(panelAPI.endpoints.updateTasksPositionsGroups.initiate(
                {
                    data: [
                        ...fromGroupTasks,
                        ...toGroupTasks
                    ]
                }
            ))
        } catch (error) {
            console.error(error)
        }

    }
)

export const updateGroupColor = createAsyncThunk(
    'panel/updateGroupColor',
    async (data, {dispatch}) => {
        try {
            
            // data.colorName
            // data.oldColorName
            // data.colorId
            // data.groupId

            dispatch(setGroupColor({colorName: data.colorName, id: data.groupId}))
            const response = await dispatch(panelAPI.endpoints.updateGroupHeaderColor.initiate({colorId: data.colorId, groupId: data.groupId}))
            if(response.data.isError) {
                dispatch(setGroupColor({colorName: data.oldColorName, id: data.groupId}))
                dispatch(setNewMicroalert({text: 'Не удалсь изменить цвет группы'}))
            }
        } catch (error) {
            dispatch(setGroupColor({colorName: data.oldColorName, id: data.groupId}))
            dispatch(setNewMicroalert({text: 'Не удалсь изменить цвет группы'}))
            console.error(error)
        }
    }
)

const panelSlice = createSlice({
    name: 'panel',
    initialState,
    reducers: {
        setData(state, action) {
            state.data = action.payload.data
        },
        resetData(state) {
            state.data = []
        },
        delGroup(state, action) {
            state.data = state.data.filter(el => el.group.id !== action.payload.id)
        },
        addGroup(state, action) {
            state.data.push(action.payload.newGroup)
        },
        setGroupColor(state, action) {
            state.data = state.data.map(el => {
                if(el.group.id === action.payload.id) {
                    return {
                        ...el,
                        group: {
                            ...el.group,
                            color: action.payload.colorName
                        }
                    }
                }
                return el
            })
        },
        setGroupTitle(state, action) {
            state.data = state.data.map(el => {
                if(el.group.id === action.payload.id) {
                    return {
                        ...el,
                        group: {
                            ...el.group,
                            title: action.payload.title
                        }
                    }
                }
                return el
            })
        },
        addTask(state, action) {
            state.data = state.data.map(el => {
                if(el.group.id === action.payload.id) {
                    return {
                        ...el,
                        tasks: [
                            ...el.tasks,
                            action.payload.task
                        ]
                    }
                }
                return el
            })
        },
        setSIngleTaskData(state, action) {
            state.data.forEach(el => {
                el.tasks = el.tasks.map(task => {
                    if(task.id === action.payload.data.id) {
                        return {
                            ...task,
                            title: action.payload.data.title,
                            description: action.payload.data.description
                        }
                    }
                    return task
                })
            })
        },
        setTasklistAfterRemoveSingleTask(state, action) {
            state.data.forEach(el => {
                if(el.group.id === action.payload.groupId) {
                    el.tasks = action.payload.taskList
                }
            })
        },
        setUpdatedTaskPosition(state, action) {
            
            if(action.payload.before !== action.payload.taskId) {

                // Вырезать старый таск
                state.data.forEach((item, index) => {
                    if(item.group.id === action.payload.fromGroupId)
                        state.data[index].tasks = state.data[index].tasks.filter(task=>task.id !== action.payload.taskId)
                })

                // Обновить позиции в старой группе таска
                state.data.forEach((item, index) => {
                    if(item.group.id === action.payload.fromGroupId)
                        state.data[index].tasks = state.data[index].tasks.map((el, index) => ({...el, position: index}))
                })

                // Вставить новый таск
                if(action.payload.before === -1) {
                    // В конец
                    state.data.forEach((item, index) => {
                        if(item.group.id === action.payload.toGroupId)
                            state.data[index].tasks.push({...action.payload.task, position: state.data[index].tasks.length, groupId: action.payload.toGroupId})
                    })
                } else {
                    // Врезать 
                    state.data.forEach((item, index) => {
                        if(item.group.id === action.payload.toGroupId)
                            state.data[index].tasks.splice(state.data[index].tasks.findIndex(el=>el.id === action.payload.before), 0, {...action.payload.task, groupId: action.payload.toGroupId})
                    })
                    
                    // Обновить позиции в новой группе таска
                    state.data.forEach((item, index) => {
                        if(item.group.id === action.payload.toGroupId)
                            state.data[index].tasks = state.data[index].tasks.map((el, index) => ({...el, position: index, groupId: action.payload.toGroupId}))
                    })
                }
            }
            
        }
    }
})

export const { 
    setData, 
    resetData, 
    delGroup, 
    addGroup, 
    setGroupTitle, 
    addTask, 
    setSIngleTaskData, 
    setTasklistAfterRemoveSingleTask, 
    setUpdatedTaskPosition,
    setGroupColor
} = panelSlice.actions
export default panelSlice.reducer