import React, { useState } from "react"
import Task from "./Task"
import { useToggleMode } from "hooks/useToggleMode"
import { useDispatch } from "react-redux"
import { deleteSingleTask } from "store/panelSlice"
import DragIndicator from "components/panel/tasks/DragIndicator/DragIndicator"

const TaskContainer = ({ data, onUpdateSingleTask, groupId, taskBeforeThis }) => {

    const [ isEditTaskMode, toggleIsEditTaskMode ] = useToggleMode(false)
    const [ isTaskFetching, setIsTaskFetching ] = useState(false)
    const dispatch = useDispatch()
    
    const deleteTask = async () => {
        setIsTaskFetching(true)
        dispatch(deleteSingleTask({taskId: data.id, groupId}))
    }

    return(
        <>
            <DragIndicator group={groupId} beforetask={data.id} aftertask={taskBeforeThis}/>
            <Task
                data={data}
                isEditTaskMode={isEditTaskMode}
                onToggleEditTaskMode={toggleIsEditTaskMode}
                onUpdateSingleTask={onUpdateSingleTask}
                deleteTask={deleteTask}
                isTaskFetching={isTaskFetching}
                groupId={groupId}
            />
        </>
    )
}

export default TaskContainer