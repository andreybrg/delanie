import React from "react"
import style from './MoreBtn.module.sass'
import { ReactComponent as MoreHorizSvg } from 'assets/img/more_horiz.svg'

const MoreBtn = ({ toggleIsControlsOpened, isControlsOpened }) => {
    return(
        <button type="button" className={style.controlsBtn} onClick={() => {
                if(!isControlsOpened) {
                    toggleIsControlsOpened()
                }
            }}>
            <MoreHorizSvg/>
        </button>
    )
}

export default MoreBtn