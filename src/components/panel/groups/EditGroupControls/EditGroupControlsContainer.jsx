import React from "react"
import { useToggleMode } from "hooks/useToggleMode"
import EditGroupControls from "./EditGroupControls"

const EditGroupControlsContainer = ({
    groupId,
    onDeleteGroupFromList,
    onToggleGroupFetching,
    isGroupFetching,
    groupColor,
}) => {

    const [ isControlsOpened, toggleIsControlsOpened] = useToggleMode(false)

    return(
        <EditGroupControls
            groupColor={groupColor}
            isControlsOpened={isControlsOpened}
            toggleIsControlsOpened={toggleIsControlsOpened}
            groupId={groupId}
            onDeleteGroupFromList={onDeleteGroupFromList}
            onToggleGroupFetching={onToggleGroupFetching}
            isGroupFetching={isGroupFetching}
        />
    )
}

export default EditGroupControlsContainer