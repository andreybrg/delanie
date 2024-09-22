import React from "react"
import TaskListContainer from "components/panel/tasks/TaskList/TaskListContainer"
import GroupHeader from "components/panel/groups/GroupHeader/GroupHeader"

const GroupContent = ({
    group,
    onDeleteGroupFromList,
    groupId,
    tasks,
    onToggleGroupFetching,
    isGroupFetching,
}) => {
    return(
        <>
            <GroupHeader 
                group={group} 
                onDeleteGroupFromList={onDeleteGroupFromList}
                onToggleGroupFetching={onToggleGroupFetching}
                isGroupFetching={isGroupFetching}
            />
            <TaskListContainer 
                groupId={groupId} 
                tasks={tasks}
                isGroupFetching={isGroupFetching}
            />
        </>
    )
}

export default GroupContent