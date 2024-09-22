import React from "react"
import { useDispatch, useSelector } from "react-redux"
import cn from 'classnames'
import style from '../../MoreAction/MoreAction.module.sass'
import submenuStyle from './ColorSubmenu.module.sass'
import { updateGroupColor } from "store/panelSlice"

const ColorSubmenu = ({ setSubmenu, groupId, oldColorName }) => {
    
    const colorData = useSelector(store => store.app.data.appData.colorData)
    const dispatch = useDispatch()

    const onChooseColor = (colorId, colorName, oldColorName, groupId) => {
        if(colorName !== oldColorName) dispatch(updateGroupColor({colorId: colorId, colorName: colorName, oldColorName: oldColorName, groupId: groupId}))
        setSubmenu({})
    }

    return(
        <div className={style.list}>
            <button className={style.button} type="button"
                onClick={() => setSubmenu({})}>
                <span>Назад</span>
            </button>
            {
                colorData.map((el) =>
                <button key={el.colorId} className={style.button} type="button"
                    onClick={() => onChooseColor(el.colorId, el.colorName, oldColorName, groupId)}>
                    <div className={style.colorPreview}>
                        <div className={cn(style.colorPreview__preview, submenuStyle[el.colorName])}>
                        </div>
                    </div>
                    <span>{el.colorName}</span>
                </button>
                )
            }
        </div>
    )
}

export default ColorSubmenu