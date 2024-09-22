import React from "react"
import style from './TaskControls.module.sass'
import { ReactComponent as DeleteSvg } from 'assets/img/delete.svg'
import { ReactComponent as EditSvg } from 'assets/img/edit.svg'

const TaskControls = ({ onToggleEditMode, deleteTask }) => {

    return(
        <div className={style.content}>
            <div onClick={() => onToggleEditMode()} className={style.item}>
                <EditSvg/>
            </div>
            <div onClick={() => deleteTask()} className={style.item}>
                <DeleteSvg/>
            </div>
        </div>
    )
}

export default TaskControls