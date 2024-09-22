import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const panelAPI = createApi({
    reducerPath: 'panelAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://sivkovdemo.ru/todoapi/' }),
    endpoints: (builder) => ({
        // Получить данные для работы приложения
        getAppData: builder.query({
            query: () => `app/get/data`,
        }),
        // Получить всю панель с задачами
        getPanelData: builder.query({
            query: ({userId}) => `panel/get/all/${userId}`,
        }),
        // Обновить заголовок группы
        updateGroupTitle: builder.mutation({
            query: ({id, title}) => {
                let formData = new FormData()
                formData.append('title', title)
                return({
                    url: `panel/post/changegrouptitle/${id}`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
        // Добавить таск
        addTask: builder.mutation({
            query: (data) => {
                let formData = new FormData()
                Object.keys(data).forEach((key)=>{
                    formData.append(key, data[key])
                })
                return({
                    url: `panel/post/create`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
        // Удалить таск
        deleteTask: builder.mutation({
            query: ({ id }) => {
                return({
                    url: `panel/delete/task/${id}`,
                    method: 'DELETE',
                })
            }
        }),
        // Обновить таск
        updateTask: builder.mutation({
            query: ({taskId, title, description}) => {
                let formData = new FormData()
                formData.append('title', title)
                formData.append('description', description)
                return({
                    url: `panel/post/updatetask/${taskId}`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
        // Добавить группу
        addGroup: builder.mutation({
            query: (data) => {
                let formData = new FormData()
                Object.keys(data).forEach((key)=>{
                    formData.append(key, data[key])
                })
                return({
                    url: `panel/post/creategroup`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
        // Удалить группу
        deleteGroup: builder.mutation({
            query: (id) => {
                return({
                    url: `panel/delete/group/${id}`,
                    method: 'DELETE',
                })
            }
        }),
        // Обновить цвет группы
        updateGroupHeaderColor: builder.mutation({
            query: ({colorId, groupId}) => {
                let formData = new FormData()
                formData.append('colorId', colorId)
                return({
                    url: `panel/post/updategroupheadercolor/${groupId}`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
        // Обновить position тасок
        updateTasksPositions: builder.mutation({
            query: ({data}) => {
                let formData = new FormData()
                data.forEach((task)=>{
                    formData.append(task.id, task.position)
                })
                return({
                    url: `panel/post/updatetaskpositions`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
        // Обновить position и groupId тасок
        updateTasksPositionsGroups: builder.mutation({
            query: ({data}) => {
                let formData = new FormData()
                data.forEach((task)=> {
                    formData.append(task.id, JSON.stringify(task))
                })
                return({
                    url: `panel/post/updatetaskpositionsgroups`,
                    method: 'POST',
                    body: formData,
                    formData: true
                })
            }
        }),
    }),
})

export const { 
    useGetAppDataQuery,
    useGetPanelDataQuery,
    useUpdateGroupTitleMutation,
    useAddTaskMutation,
    useAddGroupMutation,
    useDeleteTaskMutation,
    useDeleteGroupMutation,
    useUpdateTaskMutation,
    useUpdateTasksPositionsMutation,
    useUpdateGroupHeaderColorMutation
} = panelAPI