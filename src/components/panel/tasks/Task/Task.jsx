import React, { useState } from "react"
import cn from 'classnames'
import style from './Task.module.sass'
import TaskControlsContainer from "components/panel/tasks/TaskControls/TaskControlsContainer"
import EditTaskFormContainer from "components/panel/tasks/EditTaskForm/EditTaskFormContainer"

const Task = ({ 
    data,
    isEditTaskMode,
    onToggleEditTaskMode,
    onUpdateSingleTask,
    deleteTask,
    isTaskFetching,
    groupId
}) => {

    const [ isOnDragNow, setIsOnDragNow ] = useState(false)

    const handleDragStart = (e, task) => {
        e.dataTransfer.setData("taskId", task.id)
        e.dataTransfer.setData("taskGroupId", groupId)
        setIsOnDragNow(true)
    }
    const handleDragEnd = (e, task) => {
        setIsOnDragNow(false)
    }

    if(!isEditTaskMode) {
        return(
            <>
                <div 
                    draggable="true"
                    onDragStart={(event) => handleDragStart(event, {id: data.id})}
                    onDragEnd={(event) => handleDragEnd(event)}

                    className={cn(
                        style.task,
                        {[style.task_fetching]:isTaskFetching},
                        {[style.task_onDrag]:isOnDragNow},
                        
                    )}>
                    
                    {
                        data.title
                        ?
                        <div className={style.title}>
                            {data.title}
                        </div>
                        : null
                    }
                    {
                        data.description
                        ?
                        <div className={style.description}>
                            {data.description}
                        </div>
                        : null
                    }
                    <div className={style.controls}>
                        <TaskControlsContainer
                            onToggleEditMode={onToggleEditTaskMode}
                            deleteTask={deleteTask}
                        />
                    </div>
                </div>
            </>
        )
    } else {
        return(
            <EditTaskFormContainer
                taskId={data.id}
                onToggleEditMode={onToggleEditTaskMode}
                initialTitle={data.title}
                initialDescription={data.description}
                onUpdateSingleTask={onUpdateSingleTask}
            />
        )
    }
}

export default Task