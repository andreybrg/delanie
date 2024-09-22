import React from "react"
import style from'./ViewError.module.sass'
import sadSvg from 'assets/img/noto-v1_sad-but-relieved-face.svg'

const ViewError = ({ message }) => {
    return(
        <div className={style.container}>
            <div className={style.content}>
                <img src={sadSvg} alt="Ошибка" />
                <span>{message}</span>
            </div>
        </div>
    )
}

export default ViewError