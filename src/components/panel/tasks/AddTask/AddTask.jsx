import React from "react"
import AddTaskBtn from "components/panel/tasks/AddTaskBtn/AddTaskBtn"
import AddTaskFormContainer from "components/panel/tasks/AddTaskForm/AddTaskFormContainer"
import { useToggleMode } from "hooks/useToggleMode"

const AddTask = ({ 
    onUpdateTaskList,
    groupId,
    newTaskPosition,
}) => {

    
    // Хук для вкл\выкл режима добавления таски
    const [isAddTaskMode, toggleIsAddTaskMode] = useToggleMode(false)

    return(
        !isAddTaskMode
            ?
            <AddTaskBtn
                onToggleEditMode={toggleIsAddTaskMode}
            />
            :
            <AddTaskFormContainer
                position={newTaskPosition}
                groupId={groupId}
                onUpdateTaskList={onUpdateTaskList}
                onToggleEditMode={toggleIsAddTaskMode}
            />
    )
}

export default AddTask