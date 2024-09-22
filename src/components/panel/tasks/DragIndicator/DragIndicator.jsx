import React from "react"
import style from './DragIndicator.module.sass'

const DragIndicator = ({ group, beforetask }) => {
    return(
        <div
            draggable="false"
            className={style.item}
            data-group={group}
            data-beforetask={beforetask}
            ></div>
    )
}

export default DragIndicator