import React from "react"
import GroupContent from "./GroupContent"
import { useToggleMode } from "hooks/useToggleMode"

const GroupContentContainer = ({
    group,
    onDeleteGroupFromList,
    groupId,
    tasks,
}) => {

    const [ isGroupFetching, toggleIsGroupFetching ] = useToggleMode(false)

    return(
        <GroupContent
            group={group}
            onDeleteGroupFromList={onDeleteGroupFromList}
            groupId={groupId}
            tasks={tasks}
            onToggleGroupFetching={toggleIsGroupFetching}
            isGroupFetching={isGroupFetching}
        />
    )
}

export default GroupContentContainer