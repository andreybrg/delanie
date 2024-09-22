import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://authserver.buhtacrimea.ru:3000/' }),
    endpoints: (builder) => ({
        register: builder.mutation({
            query: ({email, password}) => {
                return({
                    url: `register`,
                    method: 'POST',
                    body: {
                        email,
                        password
                    }
                })
            }
        }),
        login: builder.mutation({
            query: ({email, password}) => {
                return({
                    url: `login`,
                    method: 'POST',
                    body: {
                        email,
                        password
                    }
                })
            }
        }),
        checkAuth: builder.query({
            query: ({token}) => {
                return({
                    url: `660/check`,
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            }
        }),
    }),
})

export const { 
    useRegisterMutation,
    useLoginMutation,
    useCheckAuthQuery
} = authAPI