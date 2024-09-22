import React from "react"
import MoreActionContainer from "components/panel/groups/MoreAction/MoreActionContainer"
import style from './ControlsActions.module.sass'

const ControlsActions = ({ 
    toggleIsControlsOpened, 
    groupId, 
    onDeleteGroupFromList, 
    onToggleGroupFetching, 
    isControlsOpened,
    groupColor,
}) => {
    return(
        <div className={style.actionitem}>
            <MoreActionContainer
                groupColor={groupColor}
                isControlsOpened={isControlsOpened}
                toggleIsControlsOpened={toggleIsControlsOpened}
                groupId={groupId}
                onDeleteGroupFromList={onDeleteGroupFromList}
                onToggleGroupFetching={onToggleGroupFetching}
            />
        </div>
    )
}

export default ControlsActions