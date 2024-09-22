import React from "react"
import style from './Preloader.module.sass'

const Preloader = () => {
    return(
        <div className={style.preloader}>
            <div className={style.content}></div>
        </div>
    )
}

export default Preloader