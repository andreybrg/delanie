import React from "react"
import TaskContainer from "components/panel/tasks/Task/TaskContainer"

const TaskList = ({ tasks, onUpdateSingleTask, groupId }) => {

    return(
        tasks.map((el, index, array) => {
            return <TaskContainer 
                key={el.id} 
                data={el} 
                groupId={groupId} 
                onUpdateSingleTask={onUpdateSingleTask} 
                taskBeforeThis={ index == 0 ? '-1' : array[index-1].id}
                />
        }
            
        )
    )
}

export default TaskList