import React from "react"
import TaskControls from "./TaskControls"

const TaskControlsContainer = ({ onToggleEditMode, deleteTask }) => {
    return(
        <TaskControls
            onToggleEditMode={onToggleEditMode}
            deleteTask={deleteTask}
        />
    )
}

export default TaskControlsContainer