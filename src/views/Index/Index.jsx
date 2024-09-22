import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const Index = () => {

    const isAuthenticated = useSelector(store => store.auth.auth.isAuth)

    return(
        <>INDEX</>
    )
    
}

export default Index