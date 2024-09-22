import React, { useEffect, useRef, useState } from "react"
import replySvg from 'assets/img/reply.svg'
import style from './EditGroupHeaderTitle.module.sass'
import { useOutsideClickHandler } from "hooks/useOutsideClickHandler"

const EditGroupHeaderTitle = ({
    onChangeGroupTitleSubmit,
    onToggleEditMode,
    onChangeInputTitle,
    inputGroupTitle,
}) => {

    const [ formRef ] = useOutsideClickHandler(onToggleEditMode, [])

    return(
        <form
            ref={formRef}
            className={style.form} 
            action="" 
            onSubmit={(event) => onChangeGroupTitleSubmit(event)}>
            <input type="text" 
                value={inputGroupTitle} 
                onChange={(event)=>onChangeInputTitle(event.target.value)}
                autoFocus/>
            <button type="submit">
                <img src={replySvg} alt="Сохранить" />
            </button>
        </form>
    )
}

export default EditGroupHeaderTitle