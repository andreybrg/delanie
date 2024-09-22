import React from "react"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const LoggedInRedirect = ({
    children,
    path='/panel'
}) => {

    const isAuthenticated = useSelector(store => store.auth.auth.isAuth)

    if(isAuthenticated) {
        return <Navigate to={path}/>
    }

    return children ? children : <Outlet />
}

export default LoggedInRedirect