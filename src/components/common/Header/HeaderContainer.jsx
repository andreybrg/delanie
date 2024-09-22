import React from "react"
import Header from "./Header"
import { makeLogout } from "store/authSlice"
import { useDispatch, useSelector } from "react-redux"

const HeaderContainer = () => {

    const isAuthenticated = useSelector(store => store.auth.auth.isAuth)
    const dispatch = useDispatch()

    const onLogOut = () => {
        dispatch(makeLogout())
    }

    return(
        <Header
            onLogOut={onLogOut}
            isAuthenticated={isAuthenticated}
        />
    )
}

export default HeaderContainer