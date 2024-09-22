import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ 
    children
}) => {

    const isAuthenticated = useSelector(store => store.auth.auth.isAuth)
    
    if(!isAuthenticated) {
        return <Navigate to={'/auth/signin'}/>
    }

    return children ? children : <Outlet />
}

export default ProtectedRoute