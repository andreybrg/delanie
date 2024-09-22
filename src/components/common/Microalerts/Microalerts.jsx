import React from "react"
import style from './Microalerts.module.sass'
import { useSelector } from "react-redux"

const Microalerts = () => {

    const microalerts = useSelector(state => state.alert.microalerts.list)

    return(
        microalerts.length
        ?
        <div className={style.content}>
        {microalerts?.map((el, index)=>
            <div key={index} className={style.item}>{el.text}</div>
        )}
        </div>
        :
        null
    )
}

export default Microalerts