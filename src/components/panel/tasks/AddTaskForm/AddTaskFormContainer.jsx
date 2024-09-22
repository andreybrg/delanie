import React, { useState } from 'react'
import { useAddTaskMutation } from 'store/panelAPI'
import { useOutsideClickHandler } from 'hooks/useOutsideClickHandler'
import TaskForm from 'components/panel/tasks/TaskForm/TaskForm'
import { useSelector } from 'react-redux'

const AddTaskFormContainer = ({ onToggleEditMode, groupId, position, onUpdateTaskList }) => {

    const [ addTask, {isLoading: isAddingTask} ] = useAddTaskMutation()
    const userId = useSelector(store => store.auth.auth.userId)

    const [ titleInput, setTitleInput ] = useState('')
    const [ descriptionInput, setDescriptionInput ] = useState('')
    const [ isFormDisabled, setIsFormDisabled ] = useState(false)

    const handleAddTask = async (groupId, position, userId, title, description) => {
        return await addTask({groupId, position, userId, title, description})
    }

    const onAddTaskFormSubmit = async (e) => {

        if(e)
            e.preventDefault()
        if(!isAddingTask) {
            setIsFormDisabled(prev=>true)
            // Размонтируем компонент если форма пустая
            if(!titleInput && !descriptionInput) {
                onToggleEditMode()
                return
            }
            const result = await handleAddTask(groupId, position, userId, titleInput, descriptionInput)
            if(!result.error) {
                onToggleEditMode()
                // Если таск добавлен, нужно добавить его в ui
                onUpdateTaskList({
                    title: titleInput,
                    description: descriptionInput,
                    id: result.data.taskId,
                    position: position,
                    groupId: groupId
                })
                return
            }
            onToggleEditMode()
        }
    }

    const [ addTaskFormRef ] = useOutsideClickHandler(onAddTaskFormSubmit, [titleInput, descriptionInput, isAddingTask])

	return(
        <TaskForm
            taskFormRef={addTaskFormRef}
            titleInput={titleInput}
            descriptionInput={descriptionInput}
            setTitleInput={setTitleInput}
            setDescriptionInput={setDescriptionInput}
            onTaskFormSubmit={onAddTaskFormSubmit}
            isLoadingTask={isAddingTask}
            isFormDisabled={isFormDisabled}
        />
	)
}

export default AddTaskFormContainer