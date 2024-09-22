import React from "react"
import cn from 'classnames'
import { ReactComponent as AddSvg } from 'assets/img/add.svg'
import style from './AddGroupBtn.module.sass'

const AddGroupBtn = ({ onToggleAddGroupMode, position }) => {

    console.log()
    return(
        <button onClick={() => onToggleAddGroupMode()} type="button" 
            className={cn(
                style.button, 
                {[style.button_withSpan]: !position}
            )}>
            <AddSvg/>
            <span>
                {!position?'Добавьте первую группу':null}
            </span>
        </button>
    )
}

export default AddGroupBtn