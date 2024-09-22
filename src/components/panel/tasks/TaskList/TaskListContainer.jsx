import React, { useState } from "react"
import cn from 'classnames'
import TaskList from "./TaskList"
import AddTask from "components/panel/tasks/AddTask/AddTask"
import style from './TaskList.module.sass'
import { useUpdateGroupTasksPositionsMutation } from "store/panelAPI"
import { useDispatch } from "react-redux"
import { addTask, changeTaskPosition, setSIngleTaskData, setUpdatedTaskPosition } from "store/panelSlice"
import DragIndicator from "components/panel/tasks/DragIndicator/DragIndicator"

const TaskListContainer = ({ tasks, groupId, isGroupFetching }) => {

    const [onDragOverState, setOnDragOverState] = useState(false)

    const dispatch = useDispatch()

    const onUpdateTaskList = (newTask) => {
        dispatch(addTask({id: groupId, task: newTask}))
    }

    const onUpdateSingleTask = (data) => {
        dispatch(setSIngleTaskData({data}))
    }


    const getClosestDragIndicator = (e) => {
        const dragIndicators = Array.from(document.querySelectorAll(`[data-group="${groupId}"]`))
        const offsetList = []
        dragIndicators.forEach(element => {
            element.style.opacity = "0"
            const indicator = element.getBoundingClientRect()
            const offset = e.clientY - indicator.top
            offsetList.push({offset: Math.abs(offset), indicator: element})
        })

        const smallestOffset = offsetList.reduce((result, current) => {
            if(current.offset < result.offset) {
                return {
                    offset: current.offset,
                    indicator: current.indicator
                }
            } else {
                return result
            }
        }, {offset: Number.POSITIVE_INFINITY, indicator: null})

        return smallestOffset
    }

    const resetDragIndicators = () => {
        const dragIndicators = Array.from(document.querySelectorAll(`[data-group="${groupId}"]`))
        dragIndicators.forEach(element => {
            element.style.opacity = "0"
        })
    }

    const onDragOverHandle = (e) => {
        e.preventDefault()
        const closestDragIndicator = getClosestDragIndicator(e)
        if(closestDragIndicator.indicator) closestDragIndicator.indicator.style.opacity = "1"
    }

    const onDragLeaveHandle = e => {
        resetDragIndicators()
    }

    const onDropHandle = e => {
        resetDragIndicators()
        const closestDragIndicator = getClosestDragIndicator(e)
        dispatch(changeTaskPosition({
            taskId: Number(e.dataTransfer.getData("taskId")),
            fromGroupId: Number(e.dataTransfer.getData("taskGroupId")),
            toGroupId: Number(closestDragIndicator.indicator.dataset.group),
            before: Number(closestDragIndicator.indicator.dataset.beforetask),
        }))
    }

    return(
        <div 
            onDragOver={event => onDragOverHandle(event)} 
            onDragLeave={event => onDragLeaveHandle(event)} 
            onDrop={(event) => onDropHandle(event)}
            className={cn(style.tasklist, {[style.tasklist_fetching]:isGroupFetching})}
            >
            <TaskList 
                tasks={tasks} 
                onUpdateSingleTask={onUpdateSingleTask} 
                groupId={groupId}
                />
            <DragIndicator group={groupId} beforetask={'-1'} aftertask={tasks.length ? tasks[tasks.length-1].id : '-1'}/>
            {
                !isGroupFetching
                ?
                <AddTask 
                    onUpdateTaskList={onUpdateTaskList}
                    groupId={groupId}
                    newTaskPosition={tasks.length}
                    />
                :
                null
            }
            
        </div>
    )
}

export default TaskListContainer