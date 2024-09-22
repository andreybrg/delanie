import React from "react"
import style from './MoreAction.module.sass'
import cn from 'classnames'
import { ReactComponent as DeleteSvg } from 'assets/img/delete.svg'
import { useOutsideClickHandler } from "hooks/useOutsideClickHandler"
import MoreActionSubmenu from "../MoreActionSubmenu/MoreActionSubmenu"

const MoreAction = ({ 
    isControlsOpened,
    toggleIsControlsOpened,
    onDeleteGroup,
    groupId,
    isDeletingGroup,
    submenuData,
    setSubmenu,
    groupColor,
 }) => {

    const onOutsideClick = () => {
        toggleIsControlsOpened()
        setSubmenu({})
    }
        
    const [ horizonMenuRef ] = useOutsideClickHandler(onOutsideClick, [isControlsOpened], isControlsOpened)

    return(
        <>
            
            {isControlsOpened
            ?
            <div className={style.container} ref={horizonMenuRef}>
                <div className={style.content}>
                {
                    !submenuData.isOpened
                    ?
                    <>
                        <button disabled={isDeletingGroup} className={style.button} type="button"
                            onClick={() => {
                                if(!isDeletingGroup) {
                                    toggleIsControlsOpened()
                                    onDeleteGroup(groupId)
                                }
                            }}>
                            <DeleteSvg/>
                            <span>Удалить</span>
                        </button>
                        <button className={style.button} type="button"
                            onClick={() => setSubmenu({isOpened: true, mode: 'color'})}>
                            <div className={style.colorPreview}>
                                <div className={cn(style.colorPreview__preview, style[groupColor])}>
                                </div>
                            </div>
                            <span>Цвет</span>
                        </button>
                    </>
                    :
                    <MoreActionSubmenu 
                        mode={submenuData.mode} 
                        setSubmenu={setSubmenu}
                        groupId={groupId}
                        functions={{}}
                        data={{oldColorName: groupColor}}
                    />
                }
                </div>
            </div>
            :
            null}
        </>
    )
}

export default MoreAction