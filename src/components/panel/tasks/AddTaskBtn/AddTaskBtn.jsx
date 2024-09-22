import React from "react"
import style from './AddTaskBtn.module.sass'
import { ReactComponent as AddSvg } from 'assets/img/add.svg'

const AddTaskBtn = ({ data, onToggleEditMode }) => {
    return(
        <button onClick={() => onToggleEditMode()} type="button" className={style.button}>
            <AddSvg/>
            <span>Новая</span>
        </button>
    )
}

export default AddTaskBtn