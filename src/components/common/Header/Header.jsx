import React from "react"
import style from './Header.module.sass'
import logo from 'assets/img/logo.svg'
import logout from 'assets/img/logout.svg'
import cn from 'classnames'
import { Link } from "react-router-dom"

const Header = ({
    onLogOut,
    isAuthenticated
}) => {
    return(
        <div className={style.header}>
            <Link to={'/'} className={style.logo}>
                <img src={logo} alt="Делание" />
            </Link>
            <div className={style.controls}>
                {
                    isAuthenticated
                    ?
                    <div className={style.controlItem} onClick={(e)=>onLogOut()}>
                        <img src={logout} alt="Выход" />
                    </div>
                    :
                    <div className={style.controlItem} onClick={(e)=>onLogOut()}>
                        <div className={style.buttons}>
                            <Link to={'/auth/signin'} className={style.btn}>
                                <span>Вход</span>
                            </Link>
                            <Link to={'/auth/signup'} className={cn(style.btn, style.btn_solid)}>
                                <span>Регистрация</span>
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header