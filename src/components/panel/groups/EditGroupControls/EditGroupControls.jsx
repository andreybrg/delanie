import React from "react"
import cn from 'classnames'
import ControlsActions from "components/panel/groups/ControlsActions/ControlsActions"
import style from './EditGroupControls.module.sass'

const EditGroupControls = ({ 
    isControlsOpened,
    toggleIsControlsOpened,
    groupId,
    onDeleteGroupFromList,
    onToggleGroupFetching,
    isGroupFetching,
    groupColor,
}) => {
    return(
        <div className={cn(style.controls, {[style.controls_opened]: isControlsOpened})}>
            <ControlsActions
                groupColor={groupColor}
                isControlsOpened={isControlsOpened}
                groupId={groupId}
                toggleIsControlsOpened={toggleIsControlsOpened}
                onDeleteGroupFromList={onDeleteGroupFromList}
                onToggleGroupFetching={onToggleGroupFetching}
                isGroupFetching={isGroupFetching}
            />
        </div>
    )
}

export default EditGroupControls